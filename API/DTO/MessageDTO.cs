namespace API.DTO
{
    public class MessageDTO
    {
        public required string ID { get; set; } 
        public required string SenderID { get; set; }
        public required string SenderDisplayName { get; set; }
        public string? SenderImageUrl { get; set; }
        public required string RecipientID { get; set; }
        public required string RecipientDisplayName { get; set; }
        public string? RecipientImageUrl { get; set; }
        public required string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; }
    }
}
