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
                //todo leave player if joined
                return base.OnDisconnected(stopCalled);
            }

            public override Task OnConnected()
            {
                return base.OnConnected();
            }
        }
    }