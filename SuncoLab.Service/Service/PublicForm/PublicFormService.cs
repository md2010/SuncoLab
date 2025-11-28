using AutoMapper;
using SuncoLab.Common;
using SuncoLab.Common.Filters;
using SuncoLab.Model.Database;
using SuncoLab.Model.Dto.Form;
using SuncoLab.Repository.ContactForm;

namespace SuncoLab.Service.Service.PublicForm
{
    public class PublicFormService(
        IContactFormRepository contactFormRepository, 
        IMapper mapper) : IPublicFormService
    {
        public async Task<bool> CreateContactForm(PostContactFormDto form)
        {
            var entity = mapper.Map<ContactForm>(form);

            return await contactFormRepository.Create(entity);
        }

        public async Task<PaginatedList<ContactForm>> FindContactForms(ContactFormFilter filter)
        {
            return await contactFormRepository.Find(filter);
        }

        public async Task<bool> MarkContactFormAsResolved(Guid id)
        {
            return await contactFormRepository.MarkAsResolved(id);
        }
    }
}
