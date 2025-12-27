using API.DTO;
using API.Entities;
using API.Interfaces;

namespace API.Extentions
{
    public static class UserExtensions
    {
        public static UserDTO ToDto(this User user, ITokenService tokenService)
        {
            return new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = tokenService.CreateToken(user)
            };
        }
    }
}
