using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    /// <summary>
    /// SignalR Hub for tracking online users.
    /// OnConnectedAsync — called automatically by SignalR when a client connects.
    ///   Registers the connection, notifies all clients, sends online list to the caller.
    /// OnDisconnectedAsync — called automatically by SignalR when a client disconnects.
    ///   Removes the connection, notifies others, sends updated online list to the caller.
    /// Requires authorization — only authenticated users can connect.
    /// </summary>
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
