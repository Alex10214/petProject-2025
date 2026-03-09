using System.Security.Claims;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize]
    public class MessageHub(IMessageRepository messageRepository, IMemberRepository memberRepository, IHubContext<OnlineUserHub> onlineUserHubContext) : Hub
    {
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var otherUser = httpContext?.Request.Query["userID"].ToString() ?? throw new HubException("user not found");
            var groupName = GetGroupName(GetUserId(), otherUser);

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            var messages = await messageRepository.GetMessageThread(GetUserId(), otherUser);

            await Clients.Group(groupName).SendAsync("ReceiveMessagesThread", messages);
        }

        public async Task SendMessage(CreateMessageDTO createMessageDTO)
        {
            var sender = await memberRepository.GetMemberByIDAsync(GetUserId());
            var recipient = await memberRepository.GetMemberByIDAsync(createMessageDTO.RecipientID);

            if (sender == null || recipient == null || sender.Id == createMessageDTO.RecipientID) throw new HubException("Cannot send message");

            var message = new Message
            {
                SenderID = sender.Id,
                RecipientID = recipient.Id,
                Content = createMessageDTO.Content,
            };

            messageRepository.AddMessage(message);

            if (await messageRepository.SaveAllAsync())
            {
                var group = GetGroupName(sender.Id, recipient.Id);
                await Clients.Group(group).SendAsync("NewMessage", message.ToDto());
                await onlineUserHubContext.Clients.User(recipient.Id).SendAsync("NewMessageNotification", message.ToDto());
            }
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            return base.OnDisconnectedAsync(exception);
        }

        private static string GetGroupName(string? caller, string other)
        {
            var stringCompare = string.CompareOrdinal(caller, other) < 0;
            return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
        }

        private string GetUserId() => Context.User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;
    }
}
