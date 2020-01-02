using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisOpenQuizAPI.Models
{
    public class Tournament
    {
        public string TournamentID { get; set; }

        public string Name { get; set; }

        public DateTime Date { get; set; }

        public string Surface { get; set; }
    }
}
