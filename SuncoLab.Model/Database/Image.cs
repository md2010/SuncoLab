using System.ComponentModel.DataAnnotations.Schema;

namespace SuncoLab.Model
{
    public class Image : BaseEntity
    {
        public bool ShowInMosaic { get; set; }

        [ForeignKey("Album")]
        public Guid? AlbumId { get; set; }
        public virtual Album? Album { get; set; }

        [ForeignKey("CoreFile")]
        public Guid FileId { get; set; }
        public virtual CoreFile File { get; set; }
    }
}
