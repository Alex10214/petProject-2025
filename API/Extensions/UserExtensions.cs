using API.DTO;
using API.Entities;
using API.Interfaces;

namespace API.Extensions
{
    public static class UserExtensions
    {
        public static UserDTO ToDto(this User user, ITokenService tokenService)
        {
            return new UserDTO
            {
                Id = user.Id,
                Email = user.Email!,
                DisplayName = user.Member?.DisplayName ?? string.Empty,
                ImageUrl = user.Member?.ImageUrl,
                Token = tokenService.CreateToken(user)
            };
        }
    }
}
