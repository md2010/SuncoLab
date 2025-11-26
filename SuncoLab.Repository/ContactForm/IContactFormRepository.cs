using SuncoLab.Common.Filters;

namespace SuncoLab.Repository.ContactForm
{
    public interface IContactFormRepository
    {
        Task<bool> Create(Model.Database.ContactForm form);

        Task<List<Model.Database.ContactForm>> Find(ContactFormFilter filter);
    }
}
