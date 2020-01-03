using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisOpenQuizCashing.Models
{
    public class Match
    {
        public string MatchID { get; set; }

        public string TournamentID { get; set; }

        public string PlayerNameA { get; set; }

        public string PlayerNameB { get; set; }

    }
}
