using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisOpenQuizAPI.Models
{
    public class Result
    {

        public int ResultID { get; set; }

        public List<int> Player1GamesWon { get; set; }

        public List<int> Player2GamesWon { get; set; }
    }
}
