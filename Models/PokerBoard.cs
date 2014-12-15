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

        public List<Player> ActivePlayers()
        {
            return Players.Where(x => !x.Inactive).ToList();
        }

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

        public void SubmitVolunteer(string connectionId)
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

        public void AddHoursForPlayer(decimal hours, string connectionid)
        {
            if (!Players.Exists(x => x.ConnectionId == connectionid)) return;
            Players.First(x => x.ConnectionId == connectionid).Hours.Add(hours);
        }

        public Player FindPlayerById(string id)
        {
            var guid = new Guid(id);
            return Players.FirstOrDefault(x => x.Id == guid);
        }

        public void RemoveInactive()
        {
            Players.Where(player => player.InactiveTime.HasValue && player.InactiveTime < DateTime.Now.AddHours(-1))
                .ToList()
                .ForEach(player => Players.Remove(player));
        }

        public void SetInactive(string connectionId)
        {
            var player = Players.FirstOrDefault(x => x.ConnectionId == connectionId);
            if (player == null) return;
            player.Inactive = true;
            player.InactiveTime = DateTime.Now;
        }

        public void ClearInactive(string connectionId)
        {
            var player = Players.FirstOrDefault(x => x.ConnectionId == connectionId);
            if (player == null) return;
            player.Inactive = false;
            player.InactiveTime = null;
        }
    }
}