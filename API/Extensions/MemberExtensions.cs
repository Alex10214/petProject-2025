using API.DTO;
using API.Entities;

namespace API.Extensions
{
    public static class MemberExtensions
    {
        public static MemberDTO ToDto(this Member member)
        {
            return new MemberDTO
            {
                Id = member.Id,
                DisplayName = member.DisplayName,
                ImageUrl = member.ImageUrl,
                BirthDate = member.BirthDate,
                Country = member.Country,
                City = member.City,
                Created = member.Created,
                LastActive = member.LastActive,
                Description = member.Description
            };
        }

        public static ImageDTO ToDto(this Image image)
        {
            return new ImageDTO
            {
                Id = image.Id,
                Url = image.Url,
                MemberID = image.MemberID
            };
        }
    }
}
