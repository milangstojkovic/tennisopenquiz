﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisOpenQuizCashing.Models
{
    public class BreakPt
    {

        public string MatchID { get; set; }

        public int Player1BreakPtAtt { get; set; }

        public int Player1BreakPtWon { get; set; }

        public int Player2BreakPtAtt { get; set; }

        public int Player2BreakPtWon { get; set; }
    }
}