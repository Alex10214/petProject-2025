namespace API.Entities
{
    public class Image
    {
        public int Id { get; set; }
        public required string Url { get; set; }
        public string? PublicID { get; set; }
        public string MemberID { get; set; } = null!;
    }
}
