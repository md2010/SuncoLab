using Microsoft.EntityFrameworkCore;
using SuncoLab.Common.Filters;
using SuncoLab.DAL;

namespace SuncoLab.Repository.ContactForm
{
    public class ContactFormRepository(AppDbContext context) : IContactFormRepository
    {
        public async Task<List<Model.Database.ContactForm>> Find(ContactFormFilter filter)
        {
            IQueryable<Model.Database.ContactForm> query = context.ContactForms;

            if (filter.Resolved.HasValue)
            {
                query = query.Where(f => f.Resolved == filter.Resolved.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<bool> Create(Model.Database.ContactForm form)
        {
            form.Initialize();
            context.ContactForms.Add(form);

            return await context.SaveChangesAsync() > 0;
        }
    }
}
