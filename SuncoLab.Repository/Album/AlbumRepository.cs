using Microsoft.EntityFrameworkCore;
using SuncoLab.Common.Filters;
using SuncoLab.DAL;
using SuncoLab.Model;

namespace SuncoLab.Repository
{
    public class AlbumRepository : IAlbumRepository
    {
        protected AppDbContext DbContext;
        protected DbSet<Album> Entities;

        public AlbumRepository(AppDbContext dbContext)
        {
            DbContext = dbContext;
            Entities = DbContext.Set<Album>();
        } 

        public async Task<Album?> InsertAsync(Album model)
        {
            model.Initialize();
            Entities.Add(model);

            return await DbContext.SaveChangesAsync() > 0 ? model : null;
        }

        public async Task<Album?> GetByIdAsync(Guid id)
        {
            var album = await Entities.FirstOrDefaultAsync(a => a.Id == id);

            return album ?? null;
        }

        public async Task<List<Album>> FindAlbumAsync(AlbumFilter filter)
        {
            try
            {
                var albums = CreateAlbumQuery(filter);                
                return await albums.ToListAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        private IQueryable<Album> CreateAlbumQuery(AlbumFilter filter)
        {
            IQueryable<Album> query = Entities.Include(a => a.CoverImage)
                                              .ThenInclude(c => c.File);

            if (filter.VisibleOnly)
            {
                query = query.Where(a => a.Show);
            }

            if (!string.IsNullOrEmpty(filter.Name))
            {
                query = query.Where(a => a.Name.Contains(filter.Name));
            }

            return query;
        }

        public async Task<Album?> GetByNameAsync(string name)
        {
            return await Entities.FirstOrDefaultAsync(a => a.Name == name);
        }

        public async Task<bool> SetCoverImage(Guid albumId, Guid imageId)
        {
            var album = await GetByIdAsync(albumId);

            album!.CoverImageId = imageId;

            return await DbContext.SaveChangesAsync() > 0; 
        }

        public async Task<bool> ChangeAlbumVisibility(Guid albumId, bool show)
        {
            var album = await GetByIdAsync(albumId);

            album!.Show = show;

            return await DbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(Album albumToDelete)
        {
            DbContext.Albums.Attach(albumToDelete);
            DbContext.Albums.Remove(albumToDelete);

            return await DbContext.SaveChangesAsync() > 0;
        }
    }
}
