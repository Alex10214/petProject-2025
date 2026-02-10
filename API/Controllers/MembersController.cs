using API.DTO;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MembersController(IMemberRepository memberRepository, IImageService imageService) : BaseApiController
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

        [HttpPut]
        public async Task<ActionResult> UpdateMember(MemberUpdateDTO updatedMember)
        {
            var existingMember = User.GetMemberId();

            var member = await memberRepository.GetMemberForUpdates(existingMember);

            if (member == null) return BadRequest("Could not get member");

            member.DisplayName = updatedMember.DisplayName ?? member.DisplayName;
            member.Description = updatedMember.Description ?? member.Description;
            member.City = updatedMember.City ?? member.City;
            member.Country = updatedMember.Country ?? member.Country;
            member.ImageUrl = updatedMember.ImageUrl ?? member.ImageUrl;
            member.User.DisplayName = updatedMember.DisplayName ?? member.User.DisplayName;

            memberRepository.Update(member);

            if (await memberRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update member");
        }

        [HttpPost("upload-image")]
        public async Task<ActionResult<Image>> UploadImage([FromForm] IFormFile file)
        {
            var member = await memberRepository.GetMemberForUpdates(User.GetMemberId());

            if (member == null) return BadRequest("Could not get member");

            var result = await imageService.UploadImageAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var image = new Image
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicID = result.PublicId,
                MemberID = User.GetMemberId()
            };

            if (member.ImageUrl == null)
            {
                member.ImageUrl = image.Url;
                member.User.ImageUrl = image.Url;
            }

            member.Images.Add(image);

            if (await memberRepository.SaveAllAsync())
            {
                return Ok(image);
            }
            else
            {
                return BadRequest("Problem adding image");
            }
        }

        [HttpDelete("delete-image/{id}")]
        public async Task<ActionResult> DeleteImage(int id)
        {
            var member = await memberRepository.GetMemberForUpdates(User.GetMemberId());

            if (member == null) return BadRequest("Could not get member");

            var image = member.Images.SingleOrDefault(i => i.Id == id);

            if (image == null) return BadRequest("Could not get image");

            if (image.PublicID == null)
            {
                var res = await imageService.DeleteImageAsync(image.PublicID);

                if (res.Error != null) return BadRequest("Something went wrong");

            }

            member.Images.Remove(image);

            if (await memberRepository.SaveAllAsync()) return Ok();

            return BadRequest("Something went wrong");
        }
    }
}
