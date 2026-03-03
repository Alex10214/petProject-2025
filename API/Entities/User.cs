
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User : IdentityUser
    {
        public required string DisplayName { get; set; }
        public string? ImageUrl { get; set; }
        public string? RefreshToken { get; set; } = null!;
        public DateTime? RefreshTokenExp { get; set; } = null!;
        public Member Member { get; set; } = null!;
        
    }
}
