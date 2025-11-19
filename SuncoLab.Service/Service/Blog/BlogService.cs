using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using SuncoLab.Model;
using SuncoLab.Model.Dto;
using SuncoLab.Repository;

namespace SuncoLab.Service
{
    public class BlogService (
        ILogger<BlogService> logger, 
        IFileService fileService, 
        IImageRepository imageRepository, 
        IBlogRepository blogRepository,
        IMapper mapper) : IBlogService
    {
        public async Task<bool> SaveBlogImage(IFormFile formFile, Guid blogId)
        {
            try
            {
                var blog = await blogRepository.GetByIdAsync(blogId);

                if (blog == null)
                {
                    logger.LogError($"Error happend on SaveBlogImage, Blog doesn't exist: {blogId}");
                    throw new Exception("Album does not exist.");
                }

                var fileId = await fileService.SaveFile(formFile, blog.Name);

                if (fileId == null)
                {
                    return false;
                }

                var image = new Image
                {
                    FileId = fileId.Value
                };

                image = await imageRepository.InsertAsync(image);

                return await blogRepository.SetCoverImage(blogId, image.Id);
            }
            catch (Exception ex)
            {
                logger.LogError($"Error happend on SaveBlogImage: {ex.Message}");
                throw new Exception(ex.Message);
            }
        }

        public async Task<Blog?> SaveBlog(CreateBlogDto model)
        {
            var blog = new Blog
            {
                Name = model.Name,
                Body = model.Html,
                Description = model.Description,
                Show = model.Show,
                Author = model.Author
            };

            return await blogRepository.InsertAsync(blog);
        }

        public async Task<List<Blog>> GetAll()
        { 
            return await blogRepository.GetAll(); 
        }

        public async Task<Blog?> GetById(Guid blogId)
        {
            return await blogRepository.GetByIdAsync(blogId);
        }
    }
}
