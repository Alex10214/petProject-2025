using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService(IConfiguration configuration) : ITokenService
    {
        public string CreateToken(User user)
        {
            var tokenKey = configuration["tokenKey"]
                ?? throw new Exception("Cannot get token key");

            if (tokenKey.Length < 64)
                throw new Exception("Token key must be at least 64 characters long");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));
            
            var claims = new List<Claim>
            {
                new (ClaimTypes.Email, user.Email),
                new (ClaimTypes.NameIdentifier, user.Id)
            };

            var creds = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha512Signature
            );

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(55),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
