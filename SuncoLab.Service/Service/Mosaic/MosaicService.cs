using AutoMapper;
using SuncoLab.Model.Database;
using SuncoLab.Model.Dto.Mosaic;
using SuncoLab.Repository.Mosaic;

namespace SuncoLab.Service.Service.Mosaic
{
    public class MosaicService(IMosaicRepository repository) : IMosaicService
    {
        public async Task<List<MosaicItemDto>> GetMosaicDtos()
        {
            return await repository.GetMosaicDtos();
        }

        public async Task<bool> EditMosaic(List<EditMosaicDto> requests)
        {
            var existingItems = await repository.GetAll();

            List<MosaicItem> itemsToAdd = [];

            foreach (var request in requests)
            {
                var existingItem = existingItems?
                    .FirstOrDefault(x => x.SortOrder == request.SortOrder);

                if (existingItem != null)
                {
                    existingItem.BlogId = request.BlogId;
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
                await repository.InsertUow(itemsToAdd);
            }

            return await repository.SaveChanges();
        }
    }
}
