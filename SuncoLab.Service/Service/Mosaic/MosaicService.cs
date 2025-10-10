using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SuncoLab.DAL;
using SuncoLab.Model.Database;
using SuncoLab.Model.Dto.Mosaic;

namespace SuncoLab.Service.Service.Mosaic
{
    public class MosaicService(AppDbContext context, IMapper mapper) : IMosaicService
    {
        public async Task<List<MosaicItemDto>> GetMosaic()
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
            var existingItems = await GetMosaic();

            List<MosaicItem> itemsToAdd = [];

            for (int i = 0; i < requests.Count; i++) 
            {
                if (existingItems.Any(x => x.SortOrder == requests[i].SortOrder))
                {
                    existingItems[i].BlogId = requests[i].BlogId;
                }
                else
                {
                    itemsToAdd.Add(new MosaicItem
                    {
                        SortOrder = requests[i].SortOrder,
                        BlogId = requests[i].BlogId
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
