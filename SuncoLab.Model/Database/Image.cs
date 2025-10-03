using System.ComponentModel.DataAnnotations.Schema;

namespace SuncoLab.Model
{
    public class Image : BaseEntity
    {
        [ForeignKey("Album")]
        public Guid? AlbumId { get; set; }
        public virtual Album? Album { get; set; }

        [ForeignKey("Blog")]
        public Guid? BlogId { get; set; }

        [ForeignKey("CoreFile")]
        public Guid FileId { get; set; }
        public virtual CoreFile File { get; set; }
    }
}
