using Microsoft.AspNetCore.Mvc;
using SuncoLab.Common.Filters;
using SuncoLab.Model.Dto.Form;
using SuncoLab.Service.Service.PublicForm;

namespace SuncoLab.API.Controllers
{
    [Route("public-form")]
    [ApiController]
    public class PublicFormController(IPublicFormService service) : ControllerBase
    {
        [HttpPost]
        [Route("contact")]
        public async Task<IActionResult> PostContactForm([FromBody]PostContactFormDto data)
        {
            var result = await service.CreateContactForm(data);

            return result ? Ok() : BadRequest();
        }

        [HttpGet]
        [Route("contact-forms")]
        public async Task<IActionResult> GetContactForms([FromQuery]ContactFormFilter filter)
        {
            var list = await service.FindContactForms(filter);

            return Ok(list);
        }
    }
}
