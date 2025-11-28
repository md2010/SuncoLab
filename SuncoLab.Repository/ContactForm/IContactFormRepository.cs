using SuncoLab.Common;
using SuncoLab.Common.Filters;

namespace SuncoLab.Repository.ContactForm
{
    public interface IContactFormRepository
    {
        Task<bool> Create(Model.Database.ContactForm form);

        Task<PaginatedList<Model.Database.ContactForm>> Find(ContactFormFilter filter);

        Task<bool> MarkAsResolved(Guid id);
    }
}
