using SuncoLab.Common;
using SuncoLab.Common.Filters;
using SuncoLab.Model.Database;
using SuncoLab.Model.Dto.Form;

namespace SuncoLab.Service.Service.PublicForm
{
    public interface IPublicFormService
    {
        Task<PaginatedList<ContactForm>> FindContactForms(ContactFormFilter filter);

        Task<bool> CreateContactForm(PostContactFormDto form);
    }
}
