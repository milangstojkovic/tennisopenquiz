using System;

namespace TennisOpenQuizCashing.Models
{
    public class Tournament
    {
        public Tournament(string tId, string Name, DateTime dt, string surface)
        {
            TournamentID = tId;
            this.Name = Name;
            Date = dt;
            Surface = surface;
        }
        public string TournamentID { get; set; }

        public string Name { get; set; }

        public DateTime Date { get; set; }

        public string Surface { get; set; }
    }
}
