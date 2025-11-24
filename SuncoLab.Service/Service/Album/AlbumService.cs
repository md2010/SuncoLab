using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using SuncoLab.Common.Filters;
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

        #region Image

        public async Task<bool> SaveImageIntoAlbum(IFormFile formFile, Guid albumId)
        {
            try
            {
                var album = await albumRepository.GetByIdAsync(albumId);

                if (album == null)
                {
                    logger.LogError($"Error happend on SaveImageIntoAlbum, Album doesn't exist: {albumId}");
                    throw new Exception("Album does not exist.");
                }

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
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> SaveImage(IFormFile formFile)
        {
            try
            {
                var fileId = await fileService.SaveFile(formFile);

                if (fileId == null)
                {
                    return false;
                }

                var image = new Image
                {
                    FileId = fileId.Value
                };

                if (await imageRepository.InsertAsync(image) != null)
                {
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                logger.LogError($"Error happend on SaveImage: {ex.Message}");
                throw new Exception(ex.Message);
            }
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

        public async Task<List<Image>> FindImagesForAlbumAsync(Guid albumId)
        {
            return await imageRepository.GetImagesForAlbum(albumId);
        }

        #endregion

        #region Album

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

        public async Task<List<Album>> FindAlbumAsync(AlbumFilter filter)
        {
            return await albumRepository.FindAlbumAsync(filter);
        }

        public async Task<bool> ChangeAlbumVisibility(Guid albumId, bool show)
        {
            return await albumRepository.ChangeAlbumVisibility(albumId, show);
        }

        public async Task<bool> SetCoverImage(Guid albumId, Guid imageId)
        {
            if (await albumRepository.GetByIdAsync(albumId) == null)
            {
                return false;
            }

            return await albumRepository.SetCoverImage(albumId, imageId);
        }

        public async Task<bool> DeleteAlbum(Guid albumId)
        {
            var album = await albumRepository.GetByIdAsync(albumId);

            if (album != null)
            {
                var result = await DeleteAlbumImages(albumId);

                if (result)
                {
#if !DEBUG
                    result = await fileService.DeleteBlobInAzureStorage(album.Name);

                    if (result)
                    {
                        return await albumRepository.Delete(album);
                    }
#else
                    return await albumRepository.Delete(album);
#endif
                }
            }

            return false;
        }


        private async Task<bool> DeleteAlbumImages(Guid albumId)
        {
            var images = await imageRepository.GetImageFileIdsForAlbum(albumId);

            foreach (var fileId in images)
            {
                await DeleteImage(fileId);
            }

            return true;
        }

#endregion
    }
}
