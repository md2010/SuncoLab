using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SuncoLab.Model.Dto.Form;

namespace SuncoLab.API.Controllers
{
    [Route("api/public-form")]
    [ApiController]
    public class PublicFormController : ControllerBase
    {
        [HttpPost]
        [Route("contact")]
        public async Task<IActionResult> PostContactForm([FromBody] PostContactFormDtoDto data)
        {

        }

        [HttpGet]
        [Route("contact-forms")]
        public async Task<IActionResult> GetContactForms()
        {

        }
    }
}
