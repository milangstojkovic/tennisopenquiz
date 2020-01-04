namespace TennisOpenQuizCashing.Models
{
    public class Set
    {
        public string MatchID { get; set; }
        public int SetNo { get; set; }
        public int Player1GamesWon { get; set; }
        public int Player2GamesWon { get; set; }
        public bool Live { get; set; }
    }
}
