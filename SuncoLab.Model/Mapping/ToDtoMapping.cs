using AutoMapper;
using SuncoLab.Model.Database;
using SuncoLab.Model.Dto.Mosaic;

namespace SuncoLab.Model.Mapping
{
    public class ToDtoMapping : Profile
    {
        public ToDtoMapping() 
        {
            CreateMap<MosaicItem, MosaicItemDto>()
                .ForMember(dest => dest.Path, opt => opt.MapFrom(src => src.Blog.CoverImage.File.Path));
        }
    }
}
