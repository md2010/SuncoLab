namespace SuncoLab.Model.Dto.Mosaic
{
    public class MosaicItemDto
    {
        public Guid Id { get; set; }
        public int SortOrder { get; set; }
        public Guid BlogId { get; set; }
        public string Path { get; set; }
    }
}
