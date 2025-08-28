using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using SuncoLab.Model;
using SuncoLab.Repository;

namespace SuncoLab.Service
{
    public class FileService : IFileService
    {          
        private readonly string rootPath;
        protected ICoreFileRepository Repository;

        public FileService(IWebHostEnvironment environment, ICoreFileRepository repository)
        {
            Repository = repository;
#if !DEBUG
            rootPath = environment.WebRootPath;
#else
            var currentPath = Directory.GetCurrentDirectory();
            string projectRoot = Path.GetFullPath(Path.Combine(currentPath, @"..\"));
            rootPath = Path.Combine(projectRoot, "SuncoLab.Frontend", "SuncoLab", "public", "images");
#endif
        }

        public async Task<Guid?> SaveFile(IFormFile formFile)
        {
            if (!Directory.Exists(rootPath))
            {
                Directory.CreateDirectory(rootPath);
            }

            var filePath = Path.Combine(rootPath, formFile.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await formFile.CopyToAsync(stream);
            }

            var entity = new CoreFile
            {
                RelativePath = Path.Combine("/images/", formFile.FileName),
                Extension = formFile.FileName[formFile.FileName.LastIndexOf(".")..],
                FileName = formFile.FileName
            };

            entity = await Repository.InsertAsync(entity);

            if (entity != null)
            {
                return entity.Id;
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> DeleteFile(Guid fileId)
        {
            var file = await Repository.GetById(fileId);

            if (file != null)
            {
                var filePath = Path.Combine(rootPath, file.FileName);

                if (File.Exists(filePath))
                {
                    try
                    {
                        File.Delete(filePath);
                        return true;
                    }
                    catch (Exception ex)
                    {
                        return false;
                    }
                }
            }

            return false;
        }
    }
}
