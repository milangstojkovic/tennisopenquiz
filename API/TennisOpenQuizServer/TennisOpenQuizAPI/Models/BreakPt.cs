using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisOpenQuizAPI.Models
{
    public class BreakPt
    {

        public Guid BreakPtID { get; set; }

        public int BreakPtAtt { get; set; }

        public int BreakPtWon { get; set; }
    }
}
