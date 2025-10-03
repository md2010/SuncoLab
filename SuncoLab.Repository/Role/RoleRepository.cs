using Microsoft.EntityFrameworkCore;
using SuncoLab.DAL;
using SuncoLab.Model;

namespace SuncoLab.Repository
{
    public class RoleRepository : IRoleRepository
    {
        protected AppDbContext DbContext;
        protected DbSet<Role> Entities;

        public RoleRepository(AppDbContext context)
        {
            DbContext = context;
            Entities = DbContext.Set<Role>();
        }

        public async Task<Guid> GetAdminRoleId()
        {
            return Entities.First(a => a.Abrv == "admin").Id;
        }
    }
}