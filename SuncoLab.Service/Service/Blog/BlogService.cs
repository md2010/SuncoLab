using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using SuncoLab.Model;
using SuncoLab.Model.Dto.Blog;
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

        public async Task<Blog?> CreateBlog(CreateBlogDto model)
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

        public async Task<bool> UpdateBlog(Guid id, CreateBlogDto model)
        {
            var existingBlog = await blogRepository.GetByIdAsync(id);

            if (existingBlog == null)
            {
                return false;
            }

            mapper.Map(model, existingBlog);
            existingBlog.DateModified = DateTime.UtcNow;

            return await blogRepository.SaveChanges();
        }

        public async Task<List<Blog>> GetAll()
        { 
            return await blogRepository.GetAll(); 
        }

        public async Task<Blog?> GetById(Guid blogId)
        {
            return await blogRepository.GetByIdAsync(blogId);
        }

        public async Task<bool> Delete(Guid id)
        {
            var blog = await blogRepository.GetByIdAsync(id);

            if (blog == null)
            {
                return false;
            }


            if (blog.CoverImageId.HasValue)
            {
                await imageRepository.DeleteImage(blog.CoverImage.FileId);
#if !DEBUG
                await fileService.DeleteFile(blog.CoverImage.FileId);
#endif
            }

            return await blogRepository.Delete(blog);
        }
    }
}
