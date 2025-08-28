using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SuncoLab.Model;
using SuncoLab.Service;

namespace SuncoLab.API.Controllers
{
    [Route("gallery")]
    [ApiController]
    public class GalleryController(IAlbumService service, ILogger<GalleryController> logger) : ControllerBase
    {
        #region Methods

        [HttpGet]
        [Route("albums")]
        public async Task<ActionResult<List<Album>>> FindAlbum()
        {
            var result = await service.FindAlbumAsync();

            return Ok(result);
        }

        [HttpGet]
        [Route("images/{albumId}")]
        public async Task<ActionResult<List<Image>>> GetImagesForAlbum(Guid albumId)
        {
            var result = await service.FindImagesForAlbumAsync(albumId);

            return Ok(result);
        }

        [HttpGet]
        [Route("mosaic-images")]
        public async Task<ActionResult<List<Image>>> GetImagesForMosaic()
        {
            var result = await service.GetImagesForMosaic();

            return Ok(result);
        }

        [HttpPost]
        [Route("set-cover-image")]
        public async Task<IActionResult> SetCoverImage(SetCoverImageRequest request)
        {
            var result = await service.SetCoverImage(request.AlbumId, request.ImageId);

            return result ? Ok(true) : NotFound();
        }

        [HttpPost]
        [Route("show-on-home-page")]
        public async Task<IActionResult> ShowImageOnHomePage(ShowImageOnHomePageRequest request)
        {
            var result = await service.ShowImageOnHomePage(request.ImageId, request.Show);

            return result ? Ok(true) : NotFound();
        }

        [HttpDelete("delete-image/{fileId}")]
        public async Task<IActionResult> DeleteImage([FromRoute] Guid fileId)
        {
            var result = await service.DeleteImage(fileId);

            return result ? Ok(true) : NotFound();
        }

        [HttpPost]
        [Route("upload-multiple")]
        public async Task<IActionResult> UploadFiles(UploadFilesModel model)
        {
            if (model == null)
            {
                return BadRequest();
            }

            foreach (var file in model.Files)
            {
                try
                {
                    await service.SaveImageIntoAlbum(file, model.AlbumId);
                }
                catch (Exception ex)
                {
                    logger.LogError($"Error on UploadFiles: {ex.Message}\n{ex.StackTrace}");
                }
            }

            return Ok(true);
        }

        [HttpPost]
        [Authorize]
        [Route("insert-album")]
        public async Task<IActionResult> CreateAlbum(CreateAlbumModel model)
        {
            var result = await service.CreateAlbum(model.Name, model.Description);

            if (result)
            {
                return Ok();
            }
            else
            {
                return Conflict();
            }
        }

        #endregion

        #region REST Models
        public class UploadFilesModel
        {
            public IFormFileCollection Files { get; set; }
            public Guid AlbumId { get; set; }
        }

        public class CreateAlbumModel
        {
            public string Name {  get; set; }
            public string? Description { get; set; }
        }

        public class SetCoverImageRequest
        {
            public Guid AlbumId { get; set; }

            public Guid ImageId { get; set; }
        }

        public class ShowImageOnHomePageRequest
        {
            public bool Show { get; set; }

            public Guid ImageId { get; set; }
        }

        #endregion
    }
}
