using SuncoLab.Model.Database;
using SuncoLab.Model.Dto.Mosaic;

namespace SuncoLab.Service.Service.Mosaic
{
    public interface IMosaicService
    {
        Task<List<MosaicItemDto>> GetMosaic();

        Task<bool> EditMosaic(List<EditMosaicDto> requests);
    }
}
