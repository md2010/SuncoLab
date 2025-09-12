using Microsoft.AspNetCore.Http;
using SuncoLab.Model;

namespace SuncoLab.Service
{
    public interface IAlbumService
    {
        Task<bool> CreateAlbum(string name, bool show, string? description);

        Task<bool> SetCoverImage(Guid albumId, Guid imageId);

        Task<bool> ShowImageOnHomePage(Guid imageId, bool show);

        Task<List<Album>> FindAlbumAsync();

        Task<bool> ChangeAlbumVisibility(Guid albumId, bool show);

        Task<bool> SaveImageIntoAlbum(IFormFile formFile, Guid albumId);

        Task<List<Image>> FindImagesForAlbumAsync(Guid albumId);

        Task<List<Image>> GetImagesForMosaic();

        Task<bool> DeleteImage(Guid fileId);
    }
}
