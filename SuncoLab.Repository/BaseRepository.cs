using SuncoLab.DAL;

namespace SuncoLab.Repository
{
    public class BaseRepository(AppDbContext context) : IBaseRepository
    {
        public async Task<bool> SaveChanges()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}
