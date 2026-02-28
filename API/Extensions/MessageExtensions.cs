using System.Linq.Expressions;
using API.DTO;
using API.Entities;

namespace API.Extensions
{
    public static class MessageExtensions
    {
        public static MessageDTO ToDto(this Message message)
        {
            return new MessageDTO
            {
                ID = message.ID,
                SenderID = message.SenderID,
                SenderDisplayName = message.Sender.DisplayName,
                SenderImageUrl = message.Sender.ImageUrl,
                RecipientID = message.RecipientID,
                RecipientDisplayName = message.Recipient.DisplayName,
                RecipientImageUrl = message.Recipient.ImageUrl,
                Content = message.Content,
                DateRead = message.DateRead,
                MessageSent = message.MessageSent
            };
        }
        public static Expression<Func<Message, MessageDTO>> ToDtoProjection()
        {
            return message => new MessageDTO
            {
                ID = message.ID,
                SenderID = message.SenderID,
                SenderDisplayName = message.Sender.DisplayName,
                SenderImageUrl = message.Sender.ImageUrl,
                RecipientID = message.RecipientID,
                RecipientDisplayName = message.Recipient.DisplayName,
                RecipientImageUrl = message.Recipient.ImageUrl,
                Content = message.Content,
                DateRead = message.DateRead,
                MessageSent = message.MessageSent
            };


        }
    }
    
}
