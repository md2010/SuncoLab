using Microsoft.EntityFrameworkCore;
using SuncoLab.DAL;
using SuncoLab.Model;

namespace SuncoLab.Repository
{
    public class CoreFileRepository : ICoreFileRepository
    {
        protected AppDbContext DbContext;
        protected DbSet<CoreFile> Entities;

        public CoreFileRepository(AppDbContext dbContext)
        {
            DbContext = dbContext;
            Entities = DbContext.Set<CoreFile>();
        }

        public async Task<CoreFile?> InsertAsync(CoreFile model)
        {
            model.Initialize();
            Entities.Add(model);

            if (await DbContext.SaveChangesAsync() > 0)
            {
                return model;
            }

            return null;
        }

        public async Task<CoreFile?> GetById(Guid id)
        {
            return await Entities.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> Delete(Guid fileId)
        {
            var fileToDelete = new CoreFile { Id = fileId };

            DbContext.CoreFiles.Attach(fileToDelete);
            DbContext.CoreFiles.Remove(fileToDelete);

            return await DbContext.SaveChangesAsync() > 0;
        }
    }
}
