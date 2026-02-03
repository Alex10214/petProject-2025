using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Image
    {
        public int Id { get; set; }
        public required string Url { get; set; }
        [JsonIgnore]
        public Member Member { get; set; } = null!;
        public string MemberID { get; set; } = null!;
    }
}
