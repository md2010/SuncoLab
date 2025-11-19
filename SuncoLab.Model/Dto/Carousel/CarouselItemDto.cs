namespace SuncoLab.Model.Dto.Carousel
{
    public class CarouselItemDto
    {
        public Guid Id { get; set; }
        public int SortOrder { get; set; }
        public string Path { get; set; }
        public Guid ImageId { get; set; }
    }
}
