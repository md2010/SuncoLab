using AutoMapper;
using SuncoLab.Model.Database;
using SuncoLab.Model.Dto;
using SuncoLab.Model.Dto.Carousel;
using SuncoLab.Model.Dto.Mosaic;

namespace SuncoLab.Model.Mapping
{
    public class ToDtoMapping : Profile
    {
        public ToDtoMapping() 
        {
            CreateMap<MosaicItem, MosaicItemDto>()
                .ForMember(dest => dest.Path, opt => opt.MapFrom(src => src.Blog.CoverImage.File.Path));

            CreateMap<CarouselItem, CarouselItemDto>()
                .ForMember(dest => dest.Path, opt => opt.MapFrom(src => src.Image.File.Path))
                .ForMember(dest => dest.ImageId, opt => opt.MapFrom(src => src.Image.Id));

            CreateMap<CreateBlogDto, Blog>()
                .ForMember(dest => dest.CoverImage, opt => opt.Ignore())
                .ForMember(dest => dest.Body, opt => opt.MapFrom(src => src.Html));
        }
    }
}
