using SuncoLab.Model;

namespace SuncoLab.Service
{
    public interface IAuthService
    {
        string CreateToken(CoreUser user);

        Task<bool> IsAuthorized(string token);
    }
}
