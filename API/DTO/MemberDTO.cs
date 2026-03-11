namespace API.DTO
{
    public class MemberDTO
    {
        public string Id { get; set; } = null!;
        public string DisplayName { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public DateOnly BirthDate { get; set; }
        public string Country { get; set; } = null!;
        public string City { get; set; } = null!;
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string? Description { get; set; }
    }
}
