using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    public class MembersController(AppDbContext context) : BaseApiController
    {

        [HttpGet] // localhost:7281/api/members
        public async Task<ActionResult<IReadOnlyList<User>>> GetMembers()
        {
           var members = await context.Users.ToListAsync();

            return members;
        }

        [Authorize]
        [HttpGet("{id}")] // localhost:7281/api/members/3
        public async Task<ActionResult<User>> GetMember(string id)
        {
            var member = await context.Users.FindAsync(id);

            if (member == null) return NotFound();

            return member;  
        }
    }
}
