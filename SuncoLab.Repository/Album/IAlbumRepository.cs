using SuncoLab.Common.Filters;
using SuncoLab.Model;

namespace SuncoLab.Repository
{
    public interface IAlbumRepository
    {
        Task<Album?> InsertAsync(Album model);

        Task<Album?> GetByIdAsync(Guid id);

        Task<Album?> GetByNameAsync(string name);

        Task<List<Album>> FindAlbumAsync(AlbumFilter filter);

        Task<bool> SetCoverImage(Guid albumId, Guid imageId);

        Task<bool> ChangeAlbumVisibility(Guid albumId, bool show);

        Task<bool> Delete(Album album);
    }
}
