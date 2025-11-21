using SuncoLab.Model;

namespace SuncoLab.Repository
{
    public interface IBlogRepository : IBaseRepository
    {
        Task<Blog?> InsertAsync(Blog model);

        Task<Blog?> GetByIdAsync(Guid id);

        Task<List<Blog>> GetAll();

        Task<bool> SetCoverImage(Guid blogId, Guid imageId);

        Task<bool> Delete(Blog blog);
    }
}
