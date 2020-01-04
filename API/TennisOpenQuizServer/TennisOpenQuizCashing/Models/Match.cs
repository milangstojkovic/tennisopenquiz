namespace TennisOpenQuizCashing.Models
{
    public class Match
    {
        public string MatchID { get; set; }

        public string TournamentID { get; set; }

        public string PlayerNameA { get; set; }

        public string PlayerNameB { get; set; }
        public bool Live { get; set; }

    }
}
