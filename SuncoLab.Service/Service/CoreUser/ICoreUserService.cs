using SuncoLab.Model;

namespace SuncoLab.Service
{
    public interface ICoreUserService
    {
        Task<bool> Create(string username, string password);

        Task<CoreUser> GetByUserNameAsync(string email);

        Task<CoreUser> ValidateUserAsync(string email, string password);
    }
}
