using System.ComponentModel.DataAnnotations;

namespace SuncoLab.Model
{
    public class BaseEntity
    {
        [Required]
        [Key]
        public Guid Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

        public void Initialize()
        {
            if (Id == null || Id == Guid.Empty)
            {
                Id = Guid.NewGuid();
            }

            DateCreated = DateTime.UtcNow;
            DateModified = DateTime.UtcNow;
        }
    }
}
