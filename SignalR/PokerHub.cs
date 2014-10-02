using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using PlanningPoker.Models;

namespace PlanningPoker.SignalR
{
        public class PokerHub : Hub
        {
            public void JoinServer(string name, bool playing = true)
            {
                var player = PokerState.Instance.PlayerJoin(name);
                player.ConnectionId = Context.ConnectionId;
                player.IsPlaying = playing;
                Clients.Caller.joinServer();
            }

            public override Task OnDisconnected(bool stopCalled)
            {
                return base.OnDisconnected(stopCalled);
            }

            public override Task OnConnected()
            {
                return base.OnConnected();
            }
        }
    }