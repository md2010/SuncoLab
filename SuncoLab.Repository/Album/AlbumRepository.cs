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

            if (await DbContext.SaveChangesAsync() > 0)
            {
                return model;
            }

            return null;
        }

        public async Task<Album?> GetByIdAsync(Guid id)
        {
            var album = await Entities.FirstOrDefaultAsync(a => a.Id == id);

            return album ?? null;
        }

        public async Task<List<Album>> FindAlbumAsync()
        {
            var albums = await Entities
                .Where(a => a.Show == true)
                .Include(a => a.CoverImage)
                    .ThenInclude(c => c.File)
                .ToListAsync();

            return albums;
        }

        public async Task<Album?> GetByNameAsync(string name)
        {
            var album = await Entities.FirstOrDefaultAsync(a => a.Name == name);

            return album ?? null;
        }

        public async Task<bool> SetCoverImage(Guid albumId, Guid imageId)
        {
            var album = await GetByIdAsync(albumId);

            album!.CoverImageId = imageId;

            return await DbContext.SaveChangesAsync() > 0; 
        }
    }
}
