using API.DTO;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MessageController(IMessageRepository messageRepository, IMemberRepository memberRepository) : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult<MessageDTO>> CreateMessage(CreateMessageDTO createMessageDTO)
        {
            var sender = await memberRepository.GetMemberByIDAsync(User.GetMemberId());
            var recipient = await memberRepository.GetMemberByIDAsync(createMessageDTO.RecipientID);

            if (sender == null || recipient == null || sender.Id == createMessageDTO.RecipientID) return NotFound("Cannot send message");

            var message = new Message
            {
                SenderID = sender.Id,
                RecipientID = recipient.Id,
                Content = createMessageDTO.Content,
            };

            messageRepository.AddMessage(message);

            if (await messageRepository.SaveAllAsync()) return message.ToDto();

            return BadRequest("Failed to send message");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessagesForMember()
        {
            var messages = await messageRepository.GetMessagesForMember(User.GetMemberId());

            return Ok(messages);
        }

        [HttpGet("thread/{recipientID}")]
        public async Task<ActionResult<IReadOnlyList<MessageDTO>>> GetMessageThread(string recipientID)
        {
            return Ok(await messageRepository.GetMessageThread(User.GetMemberId(), recipientID));
        }
    }
}
