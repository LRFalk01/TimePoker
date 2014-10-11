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
                model.Room = model.Room.ToLower();
                if (!PokerState.Instance.NameAvailable(model.Name, model.Room))
                {
                    Clients.Caller.nameAvailable(false);
                    return;
                }

                var player = PokerState.Instance.PlayerJoin(model.Name, model.Room, Context.ConnectionId);
                player.ConnectionId = Context.ConnectionId;
                player.IsPlaying = model.Spectator;

                Clients.Caller.nameAvailable(true);
                Clients.Caller.joinServer(player);
                Clients.Caller.roomName(model.Room);
                Clients.Group(model.Room).updatePlayers(PokerState.Instance.GetBoard(model.Room).Players);
            }

            public void SubmitEstimate(string estimate)
            {
                PokerState.Instance.PlayerEstimate(estimate, Context.ConnectionId);

                var board = PokerState.Instance.GetPlayerBoard(Context.ConnectionId);
                Clients.Group(board.BoardName).updatePlayers(board.Players);
            }

            public void Reset()
            {
                PokerState.Instance.Reset(Context.ConnectionId);

                var board = PokerState.Instance.GetPlayerBoard(Context.ConnectionId);
                Clients.Group(board.BoardName).updatePlayers(board.Players);
            }

            public void Volunteer()
            {
                PokerState.Instance.PlayerVolunteer(Context.ConnectionId);

                var board = PokerState.Instance.GetPlayerBoard(Context.ConnectionId);
                Clients.Group(board.BoardName).updatePlayers(board.Players);
            }

            public void LeaveGame()
            {
                if (PokerState.Instance.PlayerConnected(Context.ConnectionId))
                {
                    var board = PokerState.Instance.GetPlayerBoard(Context.ConnectionId);

                    PokerState.Instance.PlayerDisconnect(Context.ConnectionId);
                    Clients.Group(board.BoardName).updatePlayers(board.Players);
                    Clients.Caller.joinServer(new { });
                }
            }

            public void AddHours(decimal hours)
            {
                if (PokerState.Instance.PlayerConnected(Context.ConnectionId))
                {
                    var board = PokerState.Instance.GetPlayerBoard(Context.ConnectionId);

                    PokerState.Instance.AddHoursForPlayer(hours, Context.ConnectionId);
                    Clients.Group(board.BoardName).updatePlayers(board.Players);
                }
            }

            public override Task OnDisconnected(bool stopCalled)
            {
                LeaveGame();
                return base.OnDisconnected(stopCalled);
            }

            public override Task OnConnected()
            {
                return base.OnConnected();
            }
        }
    }