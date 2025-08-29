using Microsoft.AspNetCore.Http;

namespace SuncoLab.Service
{
    public interface IFileService
    {
        /// <summary>
        /// Save file into directory locally: public/images/albumName
        /// Save file into blob storage: container name: images, fileName: albumName/fileName
        /// </summary>
        /// <param name="formFile"></param>
        /// <returns></returns>
        Task<Guid?> SaveFile(IFormFile formFile, string albumName);

        Task<bool> DeleteFile(Guid fileId);
    }
}
