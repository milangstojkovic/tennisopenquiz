using System;

namespace TennisOpenQuizAPI.Models
{
    public class Match
    {
        public string MatchID { get; set; }

        public string TournamentName { get; set; }

        public string Player1 { get; set; }

        public string Player2 { get; set; }

        public string Date { get; set; }

    }
}
