using Microsoft.AspNetCore.Http;
using SuncoLab.Model;
using SuncoLab.Model.Dto.Blog;

namespace SuncoLab.Service
{
    public interface IBlogService
    {
        Task<Blog?> CreateBlog(CreateBlogDto model);

        Task<bool> SaveBlogImage(IFormFile formFile, Guid blogId);

        Task<bool> UpdateBlog(Guid id, CreateBlogDto model);

        Task<List<Blog>> GetAll();

        Task<Blog?> GetById(Guid blogId);

        Task<bool> Delete(Guid id);
    }
}
