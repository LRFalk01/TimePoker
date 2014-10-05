using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using PlanningPoker.SignalR;

namespace PlanningPoker.Models
{
    public sealed class PokerState
    {
        private static readonly Lazy<PokerState> _instance =
            new Lazy<PokerState>(() => new PokerState(GlobalHost.ConnectionManager.GetHubContext<PokerHub>()));

        public static PokerState Instance { get { return _instance.Value; } }

        private PokerState(IHubContext context)
        {
            Clients = context.Clients;
            Groups = context.Groups;
        }

        private readonly ConcurrentDictionary<string, PokerBoard> _boards =
            new ConcurrentDictionary<string, PokerBoard>(StringComparer.OrdinalIgnoreCase);

        public PokerBoard GetBoard(string boardName)
        {
            if (!_boards.ContainsKey(boardName))
            {
                var board = new PokerBoard(boardName);
                _boards.TryAdd(boardName, board);
            }
            return _boards[boardName];
        }

        public PokerBoard GetPlayerBoard(string connectionId)
        {
            if (!PlayerConnected(connectionId)) return null;
            return _boards.Select(x => x.Value).First(x => x.PlayerConnected(connectionId));
        }

        //public PokerBoard Board { get; private set; }

        public bool NameAvailable(string playerName, string boardName)
        {
            return GetBoard(boardName).NameAvailable(playerName);
        }

        public bool PlayerConnected(string connectedId)
        {
            return _boards.Any(x => x.Value.PlayerConnected(connectedId));
        }

        public Player PlayerJoin(string playerName, string boardName, string connectionId)
        {
            var board = GetBoard(boardName);
            Groups.Add(connectionId, boardName);
            var player = board.JoinGame(playerName);
            return player;
        }

        public void PlayerEstimate(string estimate, string connectionId)
        {
            if (!PlayerConnected(connectionId)) return;
            GetPlayerBoard(connectionId).SubmitEstimate(estimate, connectionId);
        }
        public void Reset(string connectionid)
        {
            GetPlayerBoard(connectionid).Clear();
        }

        public IHubConnectionContext<dynamic> Clients { get; set; }
        public IGroupManager Groups { get; set; }

        public void PlayerDisconnect(string connectionId)
        {
            var board = GetPlayerBoard(connectionId);
            board.LeaveGame(connectionId);
            Groups.Remove(connectionId, board.BoardName);
            if (board.Players.Count == 0)
            {
                _boards.TryRemove(board.BoardName, out board);
            }
            else
            {
                Clients.Group(board.BoardName).playerList(board.Players);   
            }
        }

        public void PlayerVolunteer(string connectionId)
        {
            if (!PlayerConnected(connectionId)) return;
            GetPlayerBoard(connectionId).SubmitVulonteer(connectionId);
        }
    }
}