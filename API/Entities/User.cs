
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User : IdentityUser
    {
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExp { get; set; }
        public Member Member { get; set; } = null!;
        
    }
}
