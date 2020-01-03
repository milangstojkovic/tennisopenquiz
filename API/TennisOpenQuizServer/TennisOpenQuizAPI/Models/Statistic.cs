﻿using System.Collections.Generic;

namespace TennisOpenQuizAPI.Models
{
    public class Statistic
    {

        public List<Set> Result { get; set; }

        public string MatchID { get; set; }

        public int Player1Aces { get; set; }

        public int Player2Aces { get; set; }

        public int Player1DoubleFaults { get; set; }

        public int Player2DoubleFaults { get; set; }

        public int Player1UnforcedErrors { get; set; }

        public int Player2UnforcedErrors { get; set; }

        public Winner Winners { get; set; }

        public BreakPt BreakPts { get; set; }

        public int Player1TotalPoints { get; set; }

        public int Player2TotalPoints { get; set; }
    }
}
