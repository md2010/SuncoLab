using SuncoLab.Model;

namespace SuncoLab.Repository
{
    public interface IImageRepository
    {
        Task<Image?> InsertAsync(Image model);

        Task<List<Image>> GetImagesForAlbum(Guid albumId);

        Task<bool> DeleteImage(Guid fileId);

        Task<List<Guid>> GetImageFileIdsForAlbum(Guid albumId);
    }
}
