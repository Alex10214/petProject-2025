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
        public async Task<ActionResult<IReadOnlyList<MemberDTO>>> GetMembers()
        {
            var members = await memberRepository.GetMembersAsync(User.GetMemberId());
            return Ok(members.Select(m => m.ToDto()));
        }

        /// <summary>
        /// Retrieves a single member by identifier.
        /// </summary>
        /// <param name="id">Member identifier.</param>
        /// <returns>Member details.</returns>
        [Authorize]
        [HttpGet("{id}")] // localhost:7281/api/members/3
        public async Task<ActionResult<MemberDTO>> GetMember(string id)
        {
            var member = await memberRepository.GetMemberByIDAsync(id);

            if (member == null) return NotFound();

            return member.ToDto();
        }

        /// <summary>
        /// Retrieves images associated with a specific member.
        /// </summary>
        /// <param name="id">Member identifier.</param>
        /// <returns>List of member images.</returns>
        [Authorize]
        [HttpGet("{id}/images")] // localhost:7281/api/members/3/images
        public async Task<ActionResult<IReadOnlyList<ImageDTO>>> GetMembersImages(string id)
        {
            var images = await memberRepository.GetImagesAsync(id);
            return Ok(images.Select(i => i.ToDto()));
        }

        /// <summary>
        /// Updates the current member's profile information.
        /// </summary>
        /// <param name="updatedMember">Updated member data.</param>
        /// <returns>No content on success.</returns>
        [HttpPut]
        public async Task<ActionResult> UpdateMember(MemberUpdateDTO updatedMember)
        {
            var member = await memberRepository.GetMemberForUpdates(User.GetMemberId());

            if (member == null) return BadRequest("Could not get member");

            member.DisplayName = updatedMember.DisplayName ?? member.DisplayName;
            member.Description = updatedMember.Description ?? member.Description;
            member.City = updatedMember.City ?? member.City;
            member.Country = updatedMember.Country ?? member.Country;
            member.ImageUrl = updatedMember.ImageUrl ?? member.ImageUrl;

            memberRepository.Update(member);

            if (await memberRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update member");
        }

        /// <summary>
        /// Uploads a new image for the current member.
        /// </summary>
        /// <param name="dto">Form data containing the image file.</param>
        /// <returns>Uploaded image details.</returns>
        [HttpPost("upload-image")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<ImageDTO>> UploadImage([FromForm] UploadImageDTO dto)
        {
            var member = await memberRepository.GetMemberForUpdates(User.GetMemberId());

            if (member == null) return BadRequest("Could not get member");

            var result = await imageService.UploadImageAsync(dto.File);

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
            }

            member.Images.Add(image);

            if (await memberRepository.SaveAllAsync()) return Ok(image.ToDto());

            return BadRequest("Problem adding image");
        }

        /// <summary>
        /// Sets the specified image as the member's main profile image.
        /// </summary>
        /// <param name="imageId">Image identifier.</param>
        /// <returns>No content on success.</returns>
        [HttpPut("set-main-image/{imageId}")]
        public async Task<ActionResult> SetMainImage(int imageId)
        {
            var member = await memberRepository.GetMemberForUpdates(User.GetMemberId());

            if (member == null) return BadRequest("Could not get member");

            var image = member.Images.SingleOrDefault(i => i.Id == imageId);

            if (image == null) return BadRequest("Cannot set image");
            if (member.ImageUrl == image.Url) return BadRequest("Image is already set");

            member.ImageUrl = image.Url;

            if (await memberRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Something went wrong");
        }

        /// <summary>
        /// Deletes the specified image from the member's profile.
        /// </summary>
        /// <param name="id">Image identifier.</param>
        /// <returns>Ok on success.</returns>
        [HttpDelete("delete-image/{id}")]
        public async Task<ActionResult> DeleteImage(int id)
        {
            var member = await memberRepository.GetMemberForUpdates(User.GetMemberId());

            if (member == null) return BadRequest("Could not get member");

            var image = member.Images.SingleOrDefault(i => i.Id == id);

            if (image == null) return BadRequest("Could not get image");

            if (image.PublicID != null)
            {
                var res = await imageService.DeleteImageAsync(image.PublicID!);

                if (res.Error != null) return BadRequest("Something went wrong");
            }

            member.Images.Remove(image);

            if (member.ImageUrl == image.Url)
            {
                member.ImageUrl = null;
            }

            if (await memberRepository.SaveAllAsync()) return Ok();

            return BadRequest("Something went wrong");
        }
    }
}
