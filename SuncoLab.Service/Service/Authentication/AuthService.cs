using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SuncoLab.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SuncoLab.Service
{
    public class AuthService(IConfiguration configuration) : IAuthService
    {
        private const int ExpirationMinutes = 120;

        public string CreateToken(CoreUser user)
        {
            var expiration = DateTime.Now.AddMinutes(ExpirationMinutes);

            var token = CreateJwtToken(
                CreateClaims(user),
                CreateSigningCredentials(),
                expiration
            );

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }

        public async Task<bool> IsAuthorized(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.UTF8.GetBytes(configuration["JWT:Key"]!); 

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),

                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            var result = await tokenHandler.ValidateTokenAsync(token, validationParameters);

            return result.IsValid;
        }

        private JwtSecurityToken CreateJwtToken(List<Claim> claims, SigningCredentials credentials,
            DateTime expiration) =>
            new(
                claims: claims,
                expires: expiration,
                notBefore: DateTime.Now.AddMinutes(1),
                signingCredentials: credentials
            );

        private List<Claim> CreateClaims(CoreUser user)
        {
            try
            {
                var claims = new List<Claim>
                {
                    new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new(ClaimTypes.Email, user.UserName),
                    new(ClaimTypes.Role, user.Role.Name)
                };
                return claims;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        private SigningCredentials CreateSigningCredentials()
        {
            return new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(configuration["JWT:Key"]!)
                ),
                SecurityAlgorithms.HmacSha256
            );
        }
    }
}