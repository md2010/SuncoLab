namespace SuncoLab.Model.Database
{
    public class ContactForm : BaseEntity
    {
        public bool Resolved { get; set; } = false;
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
    }
}
