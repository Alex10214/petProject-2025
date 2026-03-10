using API.DTO;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    // Summary: AccountController class for user registration and login
    public class AccountController(UserManager<User> userManager, ITokenService tokenService) : BaseApiController
    {
        /// <summary>
        /// Registers a new user account.
        /// </summary>
        /// <param name="registerDTO">User registration data.</param>
        /// <returns>Created user data with JWT token.</returns>
        [HttpPost("register")] // /api/account/register
        public async Task<ActionResult<UserDTO>> RegisterAccount(RegisterDTO registerDTO)
        {
            var user = new User
            {
                Email = registerDTO.Email,
                UserName = registerDTO.Email,
                Member = new Member
                {
                    DisplayName = registerDTO.DisplayName,
                    City = registerDTO.City,
                    Country = registerDTO.Country,
                    BirthDate = registerDTO.BirthDay,
                } 
            };

            var res = await userManager.CreateAsync(user, registerDTO.Password);

            if (!res.Succeeded)
            {
                foreach (var error in res.Errors)
                {
                    ModelState.AddModelError("identity", error.Description);
                }

                return ValidationProblem();
            }

            await SetRefreshToken(user);
            return user.ToDto(tokenService);
        }

        /// <summary>
        /// Authenticates user and returns JWT token.
        /// </summary>
        /// <param name="loginDTO">User credentials.</param>
        /// <returns>User data with JWT token.</returns>
        [HttpPost("login")] // /api/account/login
        public async Task<ActionResult<UserDTO>> Login([FromBody]LoginDTO loginDTO)
        {
            var user = await userManager.Users.Include(u => u.Member).FirstOrDefaultAsync(u => u.Email == loginDTO.Email);

            if (user == null) return Unauthorized("Invalid email or password");

            var res = await userManager.CheckPasswordAsync(user, loginDTO.Password);

            if (!res) return Unauthorized("Invalid email or password");

            await SetRefreshToken(user);
            return user.ToDto(tokenService);
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("refreshToken");
            return NoContent();
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<UserDTO>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (refreshToken == null) return NoContent();

            var user = await userManager.Users.Include(u => u.Member).FirstOrDefaultAsync(i => i.RefreshToken == refreshToken && i.RefreshTokenExp > DateTime.UtcNow);

            if (user == null) return Unauthorized();

            await SetRefreshToken(user);

            return user.ToDto(tokenService);
        }


        private async Task SetRefreshToken(User user)
        {
            var refreshToken = tokenService.GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExp = DateTime.UtcNow.AddDays(1);
            await userManager.UpdateAsync(user);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(1)
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }
    }
}
