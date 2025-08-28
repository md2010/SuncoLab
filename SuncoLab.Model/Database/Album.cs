using System.ComponentModel.DataAnnotations.Schema;

namespace SuncoLab.Model
{
    public class Album : BaseEntity
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public bool Show { get; set; }

        [ForeignKey("CoverImage")]
        public Guid? CoverImageId { get; set; }
        public Image CoverImage { get; set; }
    }
}
