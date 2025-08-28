using SuncoLab.Model;

namespace SuncoLab.Repository
{
    public interface ICoreUserRepository
    {
        Task<bool> AddAsync(CoreUser entity);

        Task<CoreUser?> ValidateUserAsync(string username, string password);

        Task<CoreUser?> GetByUserNameAsync(string username);
    }
}
