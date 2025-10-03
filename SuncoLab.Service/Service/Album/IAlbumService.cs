using Microsoft.AspNetCore.Http;
using SuncoLab.Model;

namespace SuncoLab.Service
{
    public interface IAlbumService
    {
        Task<bool> CreateAlbum(string name, bool show, string? description);

        Task<bool> SetCoverImage(Guid albumId, Guid imageId);

        Task<List<Album>> FindAlbumAsync(bool all);

        Task<bool> ChangeAlbumVisibility(Guid albumId, bool show);

        Task<bool> SaveImageIntoAlbum(IFormFile formFile, Guid albumId);

        Task<bool> SaveImage(IFormFile formFile);

        Task<List<Image>> FindImagesForAlbumAsync(Guid albumId);

        Task<bool> DeleteImage(Guid fileId);
    }
}
