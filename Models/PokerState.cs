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
            Board = new PokerBoard();
        }

        public PokerBoard Board { get; private set; }

        public bool NameAvailable(string playerName)
        {
            return Board.NameAvailable(playerName);
        }

        public bool PlayerConnected(string connectedId)
        {
            return Board.PlayerConnected(connectedId);
        }

        public Player PlayerJoin(string playerName)
        {
            var player = Board.JoinGame(playerName);
            Clients.All.playerList(Board.Players);
            return player;
        }

        public void PlayerEstimate(string estimate, string connectionId)
        {
            if (!PlayerConnected(connectionId)) return;
            Board.SubmitEstimate(estimate, connectionId);
        }
        public void Reset()
        {
            Board.Clear();
        }

        public IHubConnectionContext<dynamic> Clients { get; set; }
        public IGroupManager Groups { get; set; }

        public void PlayerDisconnect(string connectionId)
        {
            Board.LeaveGame(connectionId);
            Clients.All.playerList(Board.Players);
        }

        public void PlayerVolunteer(string connectionId)
        {
            if (!PlayerConnected(connectionId)) return;
            Board.SubmitVulonteer(connectionId);
        }
    }
}