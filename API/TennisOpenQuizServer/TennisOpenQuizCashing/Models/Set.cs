﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisOpenQuizCashing.Models
{
    public class Set
    {

        public string MatchID { get; set; }

        public int SetNo { get; set; }

        public int Player1GamesWon { get; set; }

        public int Player2GamesWon { get; set; }
    }
}