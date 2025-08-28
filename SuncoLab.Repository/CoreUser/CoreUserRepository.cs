using Microsoft.EntityFrameworkCore;
using SuncoLab.DAL;
using SuncoLab.Model;

namespace SuncoLab.Repository
{
    public class CoreUserRepository : ICoreUserRepository
    {
        protected AppDbContext DbContext;
        protected DbSet<CoreUser> Entities;

        public CoreUserRepository(AppDbContext context)
        {
            DbContext = context;
            Entities = DbContext.Set<CoreUser>();
        }

        public async Task<bool> AddAsync(CoreUser entity)
        {
            Entities.Add(entity);
            return await DbContext.SaveChangesAsync() > 0;
        }

        public async Task<CoreUser?> GetByUserNameAsync(string email)
        {
            return Entities
                .Include(u => u.Role)
                .FirstOrDefault(a => a.UserName == email) ?? null;
        }

        public async Task<CoreUser?> ValidateUserAsync(string email, string password)
        {
            return Entities
                .Where(a => a.UserName == email)
                .Where(c => c.PasswordHash == password)
                .Include(u => u.Role)
                .FirstOrDefault() ?? null;
        }
        
    }
}