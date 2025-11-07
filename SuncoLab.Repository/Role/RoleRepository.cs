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

        public async Task<bool> CreateRole(string name)
        {
            Entities.Add(new Role
            {
                Name = name,
                Abrv = name.ToLower()
            });

            return await DbContext.SaveChangesAsync() > 0;
        }
    }
}