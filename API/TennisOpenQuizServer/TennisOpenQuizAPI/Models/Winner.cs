﻿namespace TennisOpenQuizAPI.Models
{
    public class Winner
    {

        public string MatchID { get; set; }

        public int Player1ForehandWinners { get; set; }

        public int Player1BackhandWinners { get; set; }

        public int Player1TotalWinners { get; set; }

        public int Player2ForehandWinners { get; set; }

        public int Player2BackhandWinners { get; set; }

        public int Player2TotalWinners { get; set; }
    }
}
