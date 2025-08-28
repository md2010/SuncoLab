using SuncoLab.Model;

namespace SuncoLab.Repository
{
    public interface ICoreFileRepository
    {
        Task<CoreFile?> InsertAsync(CoreFile model);

        Task<CoreFile?> GetById(Guid id);
    }
}
