using System.Security.Claims;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize]
    public class OnlineUserHub(OnlineTracker onlineTracker) : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await onlineTracker.UserConnected(GetUserId(), Context.ConnectionId);

            await Clients.All.SendAsync("UserIsOnline", GetUserId());

            var currentUsers = await onlineTracker.GetOnlineUsers();
            await Clients.Caller.SendAsync("GetOnlineUsers", currentUsers);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {

            await onlineTracker.UserDisconnected(GetUserId(), Context.ConnectionId);

            await Clients.Others.SendAsync("UserIsOffline", GetUserId());

            var currentUsers = await onlineTracker.GetOnlineUsers();
            await Clients.Caller.SendAsync("GetOnlineUsers", currentUsers);
        }

        private string GetUserId() => Context.User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;  
    }
}
