using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Member
    {
        public string Id { get; set; } = null!;
        public required DateOnly BirthDate { get; set; }
        public string? ImageUrl { get; set; }
        public required string DisplayName { get; set; }
        public required string Country{ get; set; }
        public required string City{ get; set; }
        public required DateTime Created { get; set; } = DateTime.UtcNow;
        public required DateTime LastActive { get; set; } = DateTime.UtcNow;
        public string? Description { get; set; }

        [JsonIgnore]
        public List<Image> Images { get; set; } = [];

        [JsonIgnore]
        [ForeignKey(nameof(Id))]
        public User User { get; set; } = null!;
    }
}
