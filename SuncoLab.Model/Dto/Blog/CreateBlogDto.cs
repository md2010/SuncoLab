using Microsoft.AspNetCore.Http;

namespace SuncoLab.Model.Dto.Blog
{
    public class CreateBlogDto
    {
        public string Name { get; set; }
        public string Author { get; set; }
        public string Html { get; set; }
        public string? Description { get; set; } = null;
        public bool Show { get; set; } = true;
        public IFormFile? CoverImage { get; set; }
    }
}
