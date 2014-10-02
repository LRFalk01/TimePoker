using System;
using System.Collections.Concurrent;
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

        private readonly ConcurrentDictionary<string, Player> _players =
            new ConcurrentDictionary<string, Player>(StringComparer.OrdinalIgnoreCase);
        private readonly PokerBoard _board = new PokerBoard();

        public bool NameAvailable(string playerName)
        {
            return _board.NameAvailable(playerName);
        }

        public Player PlayerJoin(string playerName)
        {
            var player = _board.JoinGame(playerName);
            return player;
        }

        public IHubConnectionContext<dynamic> Clients { get; set; }
        public IGroupManager Groups { get; set; }
    }
}