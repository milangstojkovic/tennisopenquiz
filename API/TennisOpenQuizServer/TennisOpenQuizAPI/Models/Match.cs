using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisOpenQuizAPI.Models
{
    public class Match
    {
        public Guid MatchID { get; set; }

        public Guid TournamentID { get; set; }

        public Guid Player1ID { get; set; }

        public Guid Player2ID { get; set; }

    }
}
