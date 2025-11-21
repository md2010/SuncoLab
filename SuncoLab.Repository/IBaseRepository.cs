namespace SuncoLab.Repository
{
    public interface IBaseRepository
    {
        Task<bool> SaveChanges();
    }
}
