using System;
using System.Collections.Generic;
using System.Linq;

namespace PlanningPoker.Models
{
    public class PokerBoard
    {
        public PokerBoard(string boardName)
        {
            Players = new List<Player>();
            BoardName = boardName;
        }

        public List<Player> Players { get; set; }
        public string BoardName { get; private set; }

        public bool NameAvailable(string name)
        {
            var available = !Players.Exists(x => x.Name.ToLower() == name.ToLower());
            return available;
        }
        public bool PlayerConnected(string connectedId)
        {
            return Players.Exists(x => x.ConnectionId == connectedId);
        }

        public Player JoinGame(string name)
        {
            if (!NameAvailable(name)){ throw new ArgumentException("Name is not available");}
            var player = new Player(name);
            Players.Add(player);
            return player;
        }

        public void SubmitEstimate(string estimate, string connectionId)
        {
            var player = Players.FirstOrDefault(x => x.ConnectionId == connectionId);
            if (player == null || !player.IsPlaying) return;
            player.Estimate = estimate;
        }

        public void SubmitVulonteer(string connectionId)
        {
            //only one player can volunteer
            if (Players.Exists(x => x.Volunteer && x.ConnectionId != connectionId)) return;

            var player = Players.FirstOrDefault(x => x.ConnectionId == connectionId);
            if (player == null || !player.IsPlaying) return;

            player.Volunteer = !player.Volunteer;
        }

        public void Clear()
        {
            Players.ForEach(p => p.Clear());
        }

        public void LeaveGame(string connectionId)
        {
            var player = Players.SingleOrDefault(x => x.ConnectionId == connectionId);
            if (player == null) return;
            Players.Remove(player);
        }
    }
}