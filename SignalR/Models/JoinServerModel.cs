namespace PlanningPoker.SignalR.Models
{
    public class JoinServerModel
    {
        public string Name { get; set; }
        public string Room { get; set; }
        public bool Spectator { get; set; }
    }
}