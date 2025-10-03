using System.ComponentModel.DataAnnotations.Schema;

namespace SuncoLab.Model.Database
{
    public class CarouselItem : BaseEntity
    {
        public int SortOrder { get; set; }

        [ForeignKey("Image")]
        public Guid ImageId { get; set; }
        public Image Image { get; set; }
    }
}
