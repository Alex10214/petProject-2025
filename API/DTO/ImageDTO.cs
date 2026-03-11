namespace API.DTO
{
    public class ImageDTO
    {
        public int Id { get; set; }
        public required string Url { get; set; }
        public string MemberID { get; set; } = null!;
    }
}
