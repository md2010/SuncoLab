using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SuncoLab.DAL;
using SuncoLab.Model.Database;
using SuncoLab.Model.Dto.Carousel;

namespace SuncoLab.Service.Service.Carousel
{
    public class CarouselService(AppDbContext context, IMapper mapper) : ICarouselService
    {
        public async Task<List<CarouselItemDto>> GetCarousel()
        {
            var items = await context.CarouselItems
                .Include(x => x.Image)
                    .ThenInclude(y => y.File)
                .OrderBy(x => x.SortOrder)
                .ToListAsync();

            return mapper.Map<List<CarouselItemDto>>(items);
        }

        public async Task<bool> SaveCarousel(List<EditCarouselItemDto> items)
        {
            var existingItems = await context.CarouselItems.ToListAsync();

            List<CarouselItem> itemsToAdd = [];

            foreach (var item in items)
            {
                var existingItem = existingItems.FirstOrDefault(x => x.SortOrder == item.SortOrder);

                if (existingItem != null)
                {
                    existingItem.ImageId = item.ImageId;
                    context.Entry(existingItem).State = EntityState.Modified;
                }
                else
                {
                    itemsToAdd.Add(new CarouselItem
                    {
                        SortOrder = item.SortOrder,
                        ImageId = item.ImageId
                    });
                }
            }

            if (itemsToAdd.Count > 0)
            {
                await context.CarouselItems.AddRangeAsync(itemsToAdd);
            }

            return await context.SaveChangesAsync() > 0;
        }
       
    }
}
