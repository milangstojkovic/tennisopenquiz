using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisOpenQuizAPI.Models
{
    public class Match
    {
        public string MatchID { get; set; }

        public Tournament Tour { get; set; }

        public Player Player1 { get; set; }

        public Player Player2 { get; set; }

        public Statistic Stats { get; set; }
    }
}
