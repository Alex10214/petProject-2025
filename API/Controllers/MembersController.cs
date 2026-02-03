using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MembersController(IMemberRepository memberRepository) : BaseApiController
    {
        /// <summary>
        /// Retrieves a list of all members.
        /// </summary>
        /// <returns>List of members.</returns>
        [HttpGet] // localhost:7281/api/members
        public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
        {

            return Ok(await memberRepository.GetMembersAsync());
        }

        /// <summary>
        /// Retrieves a single member by identifier.
        /// </summary>
        /// <param name="id">Member identifier.</param>
        /// <returns>Member details.</returns>
        [Authorize]
        [HttpGet("{id}")] // localhost:7281/api/members/3
        public async Task<ActionResult<Member>> GetMember(string id)
        {
            var member = await memberRepository.GetMemberByIDAsync(id);

            if (member == null) return NotFound();

            return member;  
        }

        /// <summary>
        /// Retrieves images associated with a specific member.
        /// </summary>
        /// <param name="id">Member identifier.</param>
        /// <returns>List of member images.</returns>
        [Authorize]
        [HttpGet("{id}/images")] // localhost:7281/api/members/3/images
        public async Task<ActionResult<IReadOnlyList<Image>>> GetMembersImages(string id)
        {
            return Ok(await memberRepository.GetImageAsync(id));

        }
    }
}
