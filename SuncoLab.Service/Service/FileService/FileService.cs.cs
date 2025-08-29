using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using SuncoLab.Model;
using SuncoLab.Repository;

namespace SuncoLab.Service
{
    public class FileService : IFileService
    {          
        private readonly string rootPath;
        protected ICoreFileRepository _repository;
        protected ILogger<FileService> _logger;

        private BlobServiceClient _blobServiceClient;
        private readonly BlobContainerClient _containerClient;
        private const string BlobContainerName = "images";

        public FileService(IWebHostEnvironment environment, ICoreFileRepository repository, BlobServiceClient blobServiceClient, ILogger<FileService> logger)
        {
            _logger = logger;   
            _repository = repository;
            _blobServiceClient = blobServiceClient;

            _containerClient = _blobServiceClient.GetBlobContainerClient(BlobContainerName);
            _containerClient.CreateIfNotExists();
#if DEBUG
            var currentPath = Directory.GetCurrentDirectory();
            string projectRoot = Path.GetFullPath(Path.Combine(currentPath, @"..\"));
            rootPath = Path.Combine(projectRoot, "SuncoLab.Frontend", "public", "images");
#endif
        }

        public async Task<Guid?> SaveFile(IFormFile formFile, string albumName)
        {

#if !DEBUG
            var blobName = formFile.FileName;

            if (!String.IsNullOrEmpty(albumName))
            {
                blobName = String.Format("{0}/{1}", albumName, formFile.FileName);
            }

            var fileUrl = await UploadFileToBloblStorage(formFile, blobName);
            var relativePath = blobName;
#else
            var blobName = formFile.FileName;

            if (!String.IsNullOrEmpty(albumName))
            {
                blobName = Path.Combine(albumName, formFile.FileName);
            }

            var fileUrl = await UploadFileToLocalStorage(formFile, blobName,  albumName);
            var relativePath = Path.Combine("images", blobName);
#endif
            if (!String.IsNullOrEmpty(fileUrl))
            {
                var entity = new CoreFile
                {
                    FullPath = fileUrl,
                    RelativePath = relativePath,
                    Extension = formFile.FileName[formFile.FileName.LastIndexOf(".")..],
                    FileName = formFile.FileName
                };

                entity = await _repository.InsertAsync(entity);

                if (entity != null)
                {
                    return entity.Id;
                }
                else
                {
                    return null;
                }
            }

            return null;
        }

        public async Task<string> UploadFileToBloblStorage(IFormFile formFile, string blobName)
        {
            try
            {               
                var blobClient = _containerClient.GetBlobClient(blobName);
                await blobClient.UploadAsync(formFile.OpenReadStream(), true);
                return blobClient.Uri.AbsoluteUri;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error happend on UploadFileToBloblStorage: {ex.Message}");
                return string.Empty;
            }
        }

        public async Task<string> UploadFileToLocalStorage(IFormFile formFile, string blobName, string albumName = "")
        {
            var folderPath = Path.Combine(rootPath, albumName);

            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            var filePath = Path.Combine(rootPath, blobName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await formFile.CopyToAsync(stream);
            }

            return filePath;
        }

        public async Task<bool> DeleteFile(Guid fileId)
        {
            var file = await _repository.GetById(fileId);

            if (file != null)
            {
#if !DEBUG
                return await DeleteFileInBlobStorage(file);
#else
                return await DeleteFileFromLocalStorage(file);
#endif
            }

            return false;
        }

        public async Task<bool> DeleteFileInBlobStorage(CoreFile file)
        {
            try
            {
                var blobClient = _containerClient.GetBlobClient(file.RelativePath);
                return await blobClient.DeleteIfExistsAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error happend on DeleteFileInBlobStorage: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> DeleteFileFromLocalStorage(CoreFile file)
        {
            if (File.Exists(file.FullPath))
            {
                try
                {
                    File.Delete(file.FullPath);
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }

            return false;
        }
    }
}
