namespace SuncoLab.Model
{
    public class CoreFile : BaseEntity
    {
        public string RelativePath { get; set; }
        public string FileName { get; set; }
        public string Extension { get; set; }
    }
}
