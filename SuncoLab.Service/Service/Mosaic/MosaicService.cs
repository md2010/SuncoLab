using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SuncoLab.DAL;
using SuncoLab.Model.Database;
using SuncoLab.Model.Dto.Mosaic;

namespace SuncoLab.Service.Service.Mosaic
{
    public class MosaicService(AppDbContext context, IMapper mapper) : IMosaicService
    {
        public async Task<List<MosaicItemDto>> GetMosaicDtos()
        {
            var items = await context.MosaicItems
                .Include(x => x.Blog)
                    .ThenInclude(y => y.CoverImage)
                        .ThenInclude(i => i.File)
                .ToListAsync();

            return mapper.Map<List<MosaicItemDto>>(items);
        }

        public async Task<bool> EditMosaic(List<EditMosaicDto> requests)
        {
            var existingItems = await context.MosaicItems.ToListAsync();

            List<MosaicItem> itemsToAdd = [];

            foreach (var request in requests)
            {
                var existingItem = existingItems.FirstOrDefault(x => x.SortOrder == request.SortOrder);

                if (existingItem != null)
                {
                    existingItem.BlogId = request.BlogId;
                    context.Entry(existingItem).State = EntityState.Modified;
                }
                else
                {
                    itemsToAdd.Add(new MosaicItem
                    {
                        SortOrder = request.SortOrder,
                        BlogId = request.BlogId
                    });
                }
            }

            if (itemsToAdd.Count > 0)
            {
                await context.MosaicItems.AddRangeAsync(itemsToAdd);
            }

            return await context.SaveChangesAsync() > 0;
        }
    }
}
