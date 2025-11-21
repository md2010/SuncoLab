using SuncoLab.Model.Database;
using SuncoLab.Model.Dto.Mosaic;

namespace SuncoLab.Repository.Mosaic
{
    public interface IMosaicRepository : IBaseRepository
    {
        Task<List<MosaicItemDto>> GetMosaicDtos();

        Task<List<MosaicItem>?> GetAll();
        Task InsertUow(List<MosaicItem> items);
    }
}
