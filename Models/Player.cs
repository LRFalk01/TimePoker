using System;
using System.Collections.Generic;
using System.Security.AccessControl;

namespace PlanningPoker.Models
{
    public class Player
    {
        public Player(string name)
        {
            Name = name;
            Id = Guid.NewGuid();
            Hours = new List<decimal>();
        }
        public Guid Id { get; private set; }

        public string ConnectionId { get; set; }
        public string Name { get; private set; }
        public string Estimate { get; set; }
        public bool Volunteer { get; set; }
        public bool IsPlaying { get; set; }
        public List<decimal> Hours { get; set; }
        public bool Inactive { get; set; }
        public DateTime? InactiveTime { get; set; }

        public void Clear()
        {
            Estimate = null;
            Volunteer = false;
        }
    }
}