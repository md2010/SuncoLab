using Microsoft.EntityFrameworkCore;
using SuncoLab.DAL;
using SuncoLab.Model;

namespace SuncoLab.Repository
{
    public class ImageRepository : IImageRepository
    {
        protected AppDbContext DbContext;
        protected DbSet<Image> Entities;

        public ImageRepository(AppDbContext dbContext)
        {
            DbContext = dbContext;
            Entities = DbContext.Set<Image>();
        }

        public async Task<Image?> InsertAsync(Image model)
        {
            model.Initialize();
            Entities.Add(model);

            if (await DbContext.SaveChangesAsync() > 0)
            {
                return model;
            }

            return null;
        }

        public async Task<List<Image>> GetImagesForAlbum(Guid albumId)
        {
            return await Entities
                .Where(i => i.AlbumId == albumId)
                .Include(i => i.File)
                .ToListAsync();
        }

        public async Task<List<Image>> GetImagesForMosaic()
        {
            return await Entities
                .Where(i => i.ShowInMosaic)
                .Include(i => i.File)
                .ToListAsync();
        }

        public async Task<bool> DeleteImage(Guid fileId)
        {
            var imageToDelete = Entities.FirstOrDefault(x => x.FileId == fileId);

            if (imageToDelete != null)
            {
                DbContext.Images.Attach(imageToDelete);
                DbContext.Images.Remove(imageToDelete);

                return await DbContext.SaveChangesAsync() > 0;
            }

            return false;

        }

        public async Task<bool> ShowImageOnHomePage(Guid imageId, bool show)
        {
            var image = Entities.FirstOrDefault(x => x.Id == imageId);
            image.ShowInMosaic = show;

            return await DbContext.SaveChangesAsync() > 0;
        }
    }
}
