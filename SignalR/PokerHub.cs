using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using PlanningPoker.Models;
using PlanningPoker.SignalR.Models;

namespace PlanningPoker.SignalR
{
        public class PokerHub : Hub
        {
            public void JoinServer(JoinServerModel model)
            {
                if (!PokerState.Instance.NameAvailable(model.Name))
                {
                    Clients.Caller.nameAvailable(false);
                    return;
                }

                var player = PokerState.Instance.PlayerJoin(model.Name);
                player.ConnectionId = Context.ConnectionId;
                player.IsPlaying = model.Spectator;
                Clients.Caller.nameAvailable(true);
                Clients.Caller.joinServer(player);
            }

            public void CheckName(string name)
            {
                bool available = !string.IsNullOrWhiteSpace(name) && PokerState.Instance.NameAvailable(name);
                Clients.Caller.nameAvailable(available);
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