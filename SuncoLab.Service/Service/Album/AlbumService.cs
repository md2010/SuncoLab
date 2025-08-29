using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using SuncoLab.Model;
using SuncoLab.Repository;

namespace SuncoLab.Service
{
    public class AlbumService(
        IImageRepository imageRepository, 
        IAlbumRepository albumRepository, 
        IFileService fileService,
        ILogger<AlbumService> logger) : IAlbumService
    {
        public async Task<bool> SaveImageIntoAlbum(IFormFile formFile, Guid albumId)
        {
            try
            {
                var album = await albumRepository.GetByIdAsync(albumId);

                var fileId = await fileService.SaveFile(formFile, album.Name);

                if (fileId == null)
                {
                    return false;
                }

                var image = new Image
                {
                    FileId = fileId.Value,
                    AlbumId = albumId
                };

                if (await imageRepository.InsertAsync(image) != null)
                {
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                logger.LogError($"Error happend on SaveImageIntoAlbum: {ex.Message}");
                throw new Exception();
            }
        }

        public async Task<bool> CreateAlbum(string name, bool show, string? description)
        {
            if (await albumRepository.GetByNameAsync(name) != null)
            {
                return false;
            }

            var entity = new Album
            {
                Name = name,
                Description = description,
                Show = show
            };

            return await albumRepository.InsertAsync(entity) != null;
        }

        public async Task<bool> SetCoverImage(Guid albumId, Guid imageId)
        {
            if (await albumRepository.GetByIdAsync(albumId) == null)
            {
                return false;
            }

            return await albumRepository.SetCoverImage(albumId, imageId);
        }

        public async Task<bool> ShowImageOnHomePage(Guid imageId, bool show)
        {
            return await imageRepository.ShowImageOnHomePage(imageId, show);         
        }

        public async Task<bool> DeleteImage(Guid fileId)
        {
            var result = await imageRepository.DeleteImage(fileId);

            if (result)
            {
                return await fileService.DeleteFile(fileId);
            }

            return false;
        }

        public async Task<List<Album>> FindAlbumAsync()
        {
            return await albumRepository.FindAlbumAsync();
        }

        public async Task<List<Image>> FindImagesForAlbumAsync(Guid albumId)
        {
            return await imageRepository.GetImagesForAlbum(albumId);
        }

        public async Task<List<Image>> GetImagesForMosaic()
        {
            return await imageRepository.GetImagesForMosaic();
        }
    }
}
