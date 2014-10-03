using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using PlanningPoker.Models;

namespace PlanningPoker.SignalR
{
        public class PokerHub : Hub
        {
            public void JoinServer(string name)
            {
                var player = PokerState.Instance.PlayerJoin(name);
                player.ConnectionId = Context.ConnectionId;
                player.IsPlaying = true;
                Clients.Caller.joinServer(player);
            }

            public override Task OnDisconnected(bool stopCalled)
            {
                if (PokerState.Instance.PlayerConnected(Context.ConnectionId))
                    PokerState.Instance.PlayerDisconnect(Context.ConnectionId);
                return base.OnDisconnected(stopCalled);
            }

            public override Task OnConnected()
            {
                return base.OnConnected();
            }
        }
    }