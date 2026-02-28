using API.DTO;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MessageRepository(AppDbContext context) : IMessageRepository
    {
        /// <summary>
        /// Add a new message to the database.
        /// </summary>
        public void AddMessage(Message message)
        {
            context.Messages.Add(message);
        }

        /// <summary>
        /// Delete a message from the database.
        /// </summary>
        public void DeleteMessage(Message message)
        {
            context.Messages.Remove(message);
        }

        /// <summary>
        /// Returns a single message by its ID.
        /// </summary>
        public async Task<Message?> GetMessage(string messageID)
        {
            return await context.Messages.FindAsync(messageID);
        }

        /// <summary>
        /// Returns the inbox for a user - one latest message per conversation, sorted by date.
        /// </summary>
        public async Task<IEnumerable<MessageDTO>> GetMessagesForMember(string userId)
        {
            var messages = await context.Messages
                .Include(m => m.Sender)
                .Include(m => m.Recipient)
                .Where(m => m.RecipientID == userId || m.SenderID == userId)
                .OrderByDescending(m => m.MessageSent)
                .ToListAsync();

            return messages
                .GroupBy(m => m.SenderID == userId ? m.RecipientID : m.SenderID)
                .Select(g => g.First().ToDto())
                .ToList();
        }

        /// <summary>
        /// Returns the full message thread between two users, sorted by date.
        /// Also marks all unread messages from the other user as read.
        /// </summary>
        public async Task<IReadOnlyList<MessageDTO>> GetMessageThread(string currentMemberID, string recipientID)
        {
            await context.Messages.Where(m => m.RecipientID == currentMemberID && m.SenderID == recipientID && m.DateRead == null)
                .ExecuteUpdateAsync(setters =>  setters.SetProperty(x => x.DateRead, DateTime.UtcNow));

            return await context.Messages
                .Where(m => (m.RecipientID == currentMemberID && m.SenderID == recipientID) || (m.RecipientID == recipientID && m.SenderID == currentMemberID))
                .OrderBy(m => m.MessageSent)
                .Select(MessageExtensions.ToDtoProjection())
                .ToListAsync();
        }

        /// <summary>
        /// Saves all pending changes to the database. Returns true if successful.
        /// </summary>
        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}
