using Microsoft.EntityFrameworkCore;
using SuncoLab.Model;
using SuncoLab.Model.Database;

namespace SuncoLab.DAL
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Album> Albums { get; set; }
        public DbSet<CoreFile> CoreFiles { get; set; }
        public DbSet<CoreUser> CoreUsers { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<CarouselItem> CarouselItems { get; set; }
        public DbSet<MosaicItem> MosaicItems { get; set; }
    }
}
