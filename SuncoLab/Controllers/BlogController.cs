using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SuncoLab.Model.Dto;
using SuncoLab.Service;

namespace SuncoLab.Controllers
{
    [ApiController]
    [Route("blog")]
    public class BlogController(ILogger<BlogController> logger, IBlogService blogService) : ControllerBase
    {
        #region Methods

        [HttpPost]
        [Authorize]
        [Route("create")]
        public async Task<IActionResult> CreateBlog(CreateBlogDto model)
        {
            if (model == null)
            {
                return BadRequest();
            }

            try
            {
                var result = await blogService.SaveBlog(model);

                if (result != null)
                {
                    await blogService.SaveBlogImage(model.CoverImage, result.Id);
                }

                return result != null ? Ok(true) : BadRequest();
            }
            catch (Exception ex)
            {
                logger.LogError($"Error happend on creating blog: {ex.Message}", ex);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var blogs = await blogService.GetAll();

            return Ok(blogs);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await blogService.GetById(id);

            return Ok(result);
        }

        #endregion

    }
}
