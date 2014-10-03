using System;
using System.Collections.Generic;
using System.Linq;

namespace PlanningPoker.Models
{
    public class PokerBoard
    {
        public PokerBoard()
        {
            Players = new List<Player>();
        }

        public List<Player> Players { get; set; }

        public bool NameAvailable(string name)
        {
            return !Players.Exists(x => x.Name.ToLower() == name.ToLower());
        }

        public Player JoinGame(string name)
        {
            if (!NameAvailable(name)) throw new ArgumentException("Name is not available");
            var player = new Player(name);
            Players.Add(player);
            return player;
        }

        public void SubmitEstimate(Guid playerId, string estimate)
        {
            var player = Players.FirstOrDefault(x => x.Id == playerId);
            if (player == null || !player.IsPlaying) return;
            player.Estimate = estimate;
        }

        public void SubmitVulonteer(Guid playerId)
        {
            var player = Players.FirstOrDefault(x => x.Id == playerId);
            if (player == null || !player.IsPlaying) return;
            player.Volunteer = !player.Volunteer;
        }

        public void Clear()
        {
            Players.ForEach(p => p.Clear());
        }
    }
}