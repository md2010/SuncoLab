using SuncoLab.Common;
using SuncoLab.Model;
using SuncoLab.Repository;

namespace SuncoLab.Service
{
    public class CoreUserService(ICoreUserRepository repository, PasswordGenerator passwordGenerator, IRoleRepository roleRepository) : ICoreUserService
    {
        public async Task<bool> Create(string username, string password)
        {
            if (await GetByUserNameAsync(username) != null)
            {
                return false;
            }

            (string hashedPasword, byte[] salt) = passwordGenerator.HashPassword(password);

            CoreUser entity = new CoreUser
            {
                Id = Guid.NewGuid(),
                UserName = username,
                RoleId = await roleRepository.GetAdminRoleId(),
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                PasswordHash = hashedPasword,
                PasswordSalt = salt
            };  
            
            return await repository.AddAsync(entity);
        }

        public async Task<CoreUser> GetByUserNameAsync(string email)
        {
            return await repository.GetByUserNameAsync(email);
        }

        public async Task<CoreUser> ValidateUserAsync(string email, string password)
        {
            return await repository.ValidateUserAsync(email, password);
        }
    }
}