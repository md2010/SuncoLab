using Microsoft.AspNetCore.Http;
using SuncoLab.Model;
using SuncoLab.Model.Dto;

namespace SuncoLab.Service
{
    public interface IBlogService
    {
        Task<Blog?> SaveBlog(CreateBlogDto model);

        Task<bool> SaveBlogImage(IFormFile formFile, Guid blogId);

        Task<List<Blog>> GetAll();

        Task<Blog?> GetById(Guid blogId);
    }
}
