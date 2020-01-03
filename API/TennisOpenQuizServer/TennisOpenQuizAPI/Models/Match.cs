using System;

namespace TennisOpenQuizAPI.Models
{
    public class Match
    {
        public string MatchID { get; set; }

        public string TournamentID { get; set; }

        public string Player1ID { get; set; }

        public string Player2ID { get; set; }

        public DateTime Date { get; set; }

    }
}
