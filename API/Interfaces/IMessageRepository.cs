using API.DTO;
using API.Entities;

namespace API.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        Task<IEnumerable<MessageDTO>> GetMessagesForMember(string userId);
        Task<IReadOnlyList<MessageDTO>> GetMessageThread(string currentMemberID, string recipientID);
        Task<bool> SaveAllAsync();
    }
}
