using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisOpenQuizAPI.Models
{
    public class Winner
    {

        public string WinnerID { get; set; }

        public int ForehandWinners { get; set; }

        public int BackhandWinners { get; set; }

        public int TotalWinners { get; set; }
    }
}
