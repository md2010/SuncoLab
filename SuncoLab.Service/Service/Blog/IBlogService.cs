using Microsoft.AspNetCore.Http;
using SuncoLab.Model;

namespace SuncoLab.Service
{
    public interface IBlogService
    {
        Task<Blog?> SaveBlog(string name, string html, bool show, string? description = "");

        Task<bool> SaveBlogImage(IFormFile formFile, Guid blogId);

        Task<List<Blog>> GetAll();

        Task<Blog?> GetById(Guid blogId);
    }
}
