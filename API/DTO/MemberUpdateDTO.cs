namespace API.DTO
{
    public class MemberUpdateDTO
    {
        public string? ImageUrl { get; set; }
        public string DisplayName { get; set; } = null!;
        public string Country { get; set; } = null!;
        public string City { get; set; } = null!;
        public string? Description { get; set; }
    }
}
