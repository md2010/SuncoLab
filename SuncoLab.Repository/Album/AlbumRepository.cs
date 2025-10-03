using Microsoft.EntityFrameworkCore;
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

        public async Task<List<Album>> FindAlbumAsync(bool all)
        {
            try
            {
                IQueryable<Album> albums;

                if (!all)
                {
                    albums = Entities
                        .Where(a => a.Show == true)
                        .Include(a => a.CoverImage)
                            .ThenInclude(c => c.File);
                }
                else
                {
                    albums = Entities
                        .Include(a => a.CoverImage)
                            .ThenInclude(c => c.File);
                }

                return await albums.ToListAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }

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
    }
}
