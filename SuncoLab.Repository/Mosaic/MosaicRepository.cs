using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SuncoLab.DAL;
using SuncoLab.Model.Database;
using SuncoLab.Model.Dto.Mosaic;

namespace SuncoLab.Repository.Mosaic
{
    public class MosaicRepository(AppDbContext context, IMapper mapper) 
        : BaseRepository(context), IMosaicRepository
    {
        public async Task<List<MosaicItemDto>> GetMosaicDtos()
        {
            var items = await context.MosaicItems
                .Include(x => x.Blog)
                    .ThenInclude(y => y.CoverImage)
                        .ThenInclude(i => i.File)
                    .OrderBy(x => x.SortOrder)
                .ToListAsync();

            return mapper.Map<List<MosaicItemDto>>(items);
        }

        public async Task<List<MosaicItem>?> GetAll()
        {
            return await context.MosaicItems.ToListAsync();
        }

        public async Task InsertUow(List<MosaicItem> items)
        {
            foreach (var item in items)
            {
                item.Initialize();
            }

            await context.MosaicItems.AddRangeAsync(items);
            return;
        }
    }
}
