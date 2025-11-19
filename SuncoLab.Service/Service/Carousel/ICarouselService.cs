using SuncoLab.Model.Dto.Carousel;

namespace SuncoLab.Service.Service.Carousel
{
    public interface ICarouselService
    {
        Task<List<CarouselItemDto>> GetCarousel();
        Task<bool> SaveCarousel(List<EditCarouselItemDto> items);
    }
}
