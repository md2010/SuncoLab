using System.ComponentModel.DataAnnotations.Schema;

namespace SuncoLab.Model.Database
{
    public class MosaicItem : BaseEntity
    {
        public int SortOrder { get; set; }

        [ForeignKey("Blog")]
        public Guid BlogId { get; set; }
        public Blog Blog { get; set; }
    }
}
