using System;

namespace TennisOpenQuizCashing.Models
{
    public class Tournament
    {
        public string TournamentID { get; set; }

        public string Name { get; set; }

        public DateTime Date { get; set; }

        public string Surface { get; set; }
    }
}
