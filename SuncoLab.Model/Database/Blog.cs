using System.ComponentModel.DataAnnotations.Schema;

namespace SuncoLab.Model
{
    public class Blog : BaseEntity
    {
        [Column(TypeName = "text")]
        public string Body { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public bool Show { get; set; } = true;

        [ForeignKey("CoverImage")]
        public Guid? CoverImageId { get; set; }
        public Image CoverImage { get; set; }
    }
}
