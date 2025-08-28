using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SuncoLab.Common;
using SuncoLab.Service;

namespace SuncoLab.API.Controllers
{
    [Route("login")]
    [ApiController]
    public class LoginController(
        PasswordGenerator passwordGenerator,
        IAuthService authenticationService,
        ICoreUserService userService) : ControllerBase
    {
        [HttpPost]
        [Authorize]
        [Route("register")]
        public async Task<IActionResult> Register(LoginModel model)
        {
            var result = await userService.Create(model.Username, model.Password);

            if (result)
            {
                var user = await userService.GetByUserNameAsync(model.Username);

                var accessToken = authenticationService.CreateToken(user);
                return Ok(new AuthResponse
                {
                    UserId = user.Id,
                    Token = accessToken,
                    RoleId = user.Role.Id.ToString(),
                    RoleName = user.Role.Name
                });
            }
            else
            {
                return Conflict("Username already exists.");
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (model == null)
            {
                return BadRequest();
            }

            var user = await userService.GetByUserNameAsync(model.Username);
            if (user != null)
            {
                bool validated = passwordGenerator.VerifyPassword(model.Password, user.PasswordHash, user.PasswordSalt);               

                if (validated)
                {
                    var accessToken = authenticationService.CreateToken(user);
                    return Ok(new AuthResponse
                    {
                        UserId = user.Id,
                        Token = accessToken,
                        RoleId = user.Role.Id.ToString(),
                        RoleName = user.Role.Name
                    });
                }
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("is-authorized")]
        public async Task<IActionResult> IsAuthorized(TokenModel tokenModel)
        {
            return Ok(await authenticationService.IsAuthorized(tokenModel.Token));
        }

        #region Classes

        public class TokenModel
        {
            public string Token { get; set; }
        }
        public class LoginModel
        {
            public string Username { get; set; }

            public string Password { get; set; }
        }

        public class AuthResponse
        {
            public Guid UserId { get; set; }

            public string Token { get; set; }

            public string RoleName { get; set; }

            public string RoleId { get; set; }
        }

        #endregion
    }
}
