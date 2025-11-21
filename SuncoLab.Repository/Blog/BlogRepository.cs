using Microsoft.EntityFrameworkCore;
using SuncoLab.DAL;
using SuncoLab.Model;

namespace SuncoLab.Repository
{
    public class BlogRepository : BaseRepository, IBlogRepository
    {
        protected AppDbContext DbContext;
        protected DbSet<Blog> Entities;

        public BlogRepository(AppDbContext dbContext) : base(dbContext)
        {
            DbContext = dbContext;
            Entities = DbContext.Set<Blog>();
        }

        public async Task<Blog?> InsertAsync(Blog model)
        {
            model.Initialize();
            Entities.Add(model);

            return await DbContext.SaveChangesAsync() > 0 ? model : null;   
        }

        public async Task<Blog?> GetByIdAsync(Guid id)
        {
            return await Entities.FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<List<Blog>> GetAll()
        {
            var result = await Entities
                .Where(a => a.Show == true)
                .Include(a => a.CoverImage)
                    .ThenInclude(c => c.File)
                .OrderByDescending(b => b.DateCreated)
                .ToListAsync();

            return result;
        }

        public async Task<bool> SetCoverImage(Guid blogId, Guid imageId)
        {
            var album = await GetByIdAsync(blogId);

            album!.CoverImageId = imageId;

            return await DbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(Blog blog)
        {
            DbContext.Blogs.Remove(blog);
            return await DbContext.SaveChangesAsync() > 0;
        }
    }
}
