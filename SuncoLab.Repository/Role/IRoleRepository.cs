using SuncoLab.Model;

namespace SuncoLab.Repository
{
    public interface IRoleRepository
    {
        Task<Guid> GetAdminRoleId();
    }
}
