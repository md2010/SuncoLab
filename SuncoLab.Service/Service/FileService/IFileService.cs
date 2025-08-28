using Microsoft.AspNetCore.Http;

namespace SuncoLab.Service
{
    public interface IFileService
    {
        /// <summary>
        /// Save file into directory
        /// </summary>
        /// <param name="formFile"></param>
        /// <returns></returns>
        Task<Guid?> SaveFile(IFormFile formFile);

        Task<bool> DeleteFile(Guid fileId);
    }
}
