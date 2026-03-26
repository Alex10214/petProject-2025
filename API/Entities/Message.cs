namespace API.Entities
{
    public class Message
    {
        public string ID { get; set; } = Guid.NewGuid().ToString();
        public required string Content { get; set; } = null!;
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; } = DateTime.UtcNow;
        public bool SenderDeleted { get; set; }
        public bool RecipientDeleted { get; set; }
        public required string SenderID { get; set; } = null!;
        public Member Sender { get; set; } = null!;
        public string RecipientID { get; set; } = null!;
        public Member Recipient { get; set; } = null!;
    }
}
