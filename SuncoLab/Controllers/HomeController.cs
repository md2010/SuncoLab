using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SuncoLab.Model.Dto.Mosaic;
using SuncoLab.Service.Service.Mosaic;

namespace SuncoLab.API.Controllers
{
    [Route("home")]
    [ApiController]
    public class HomeController(IMosaicService mosaicService) : ControllerBase
    {
        [HttpGet]
        [Route("get-mosaic")]
        public async Task<IActionResult> GetMosaic()
        {
            var mosaic = await mosaicService.GetMosaic();
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
    }

    #region Classes

    public class EditMosaicRequest
    {
        public List<EditMosaicDto> Items { get; set; }  
    }

    #endregion
}
