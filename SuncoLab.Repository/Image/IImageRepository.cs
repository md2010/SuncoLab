using SuncoLab.Model;

namespace SuncoLab.Repository
{
    public interface IImageRepository
    {
        Task<Image?> InsertAsync(Image model);

        Task<List<Image>> GetImagesForAlbum(Guid albumId);

        Task<List<Image>> GetImagesForMosaic();

        Task<bool> DeleteImage(Guid fileId);

        Task<bool> ShowImageOnHomePage(Guid imageId, bool show);
    }
}
