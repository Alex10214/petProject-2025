namespace API.DTO
{
    public class CreateMessageDTO
    {
        public required string RecipientID { get; set; }
        public required string Content { get; set; }
    }
}
