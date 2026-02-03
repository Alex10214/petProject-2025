namespace API.DTO
{
    public class SeedUserDTO
    {
        public required string Id { get; set; } = null!;
        public required DateOnly BirthDate { get; set; }
        public required string Email { get; set; }
        public string? ImageUrl { get; set; }
        public required string DisplayName { get; set; }
        public required string Country { get; set; }
        public required string City { get; set; }
        public required DateTime Created { get; set; }
        public required DateTime LastActive { get; set; }
        public string? Description { get; set; }
    }
}
