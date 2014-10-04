﻿using System;
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

        public void LeaveGame(string connectionId)
        {
            var player = Players.SingleOrDefault(x => x.ConnectionId == connectionId);
            if (player == null) return;
            Players.Remove(player);
        }
    }
}