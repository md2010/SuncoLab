using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SuncoLab.Model.Dto.Carousel;
using SuncoLab.Model.Dto.Mosaic;
using SuncoLab.Service.Service.Carousel;
using SuncoLab.Service.Service.Mosaic;

namespace SuncoLab.API.Controllers
{
    [Route("home")]
    [ApiController]
    public class HomeController(IMosaicService mosaicService, ICarouselService carouselService) : ControllerBase
    {
        [HttpGet]
        [Route("get-mosaic")]
        public async Task<IActionResult> GetMosaic()
        {
            var mosaic = await mosaicService.GetMosaicDtos();
            return Ok(mosaic);
        }

        [HttpPost]
        [Authorize]
        [Route("edit-mosaic")]
        public async Task<IActionResult> EditMosaic(EditMosaicRequest request)
        {
            var result = await mosaicService.EditMosaic(request.Items);

            return result ? Ok(true) : BadRequest();
        }

        [HttpGet]
        [Route("get-carousel")]
        public async Task<IActionResult> GetCarousel()
        {
            var mosaic = await carouselService.GetCarousel();
            return Ok(mosaic);
        }

        [HttpPost]
        [Authorize]
        [Route("edit-carousel")]
        public async Task<IActionResult> Edit(EditCarouselRequest request)
        {
            var result = await carouselService.SaveCarousel(request.Items);

            return result ? Ok(true) : BadRequest();
        }
    }

    #region Classes

    public class EditMosaicRequest
    {
        public List<EditMosaicDto> Items { get; set; }  
    }

    public class EditCarouselRequest
    {
        public List<EditCarouselItemDto> Items { get; set; }
    }

    #endregion
    }
