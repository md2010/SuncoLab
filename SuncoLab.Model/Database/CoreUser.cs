using System.ComponentModel.DataAnnotations.Schema;

namespace SuncoLab.Model
{
    public class CoreUser : BaseEntity
    {
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        [ForeignKey("Role")]
        public Guid RoleId { get; set; }
        public virtual Role Role { get; set; }        
    }
}
