using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisOpenQuizAPI.Models
{
    public class Set
    {

        public Guid SetID { get; set; }

        public int Player1GamesWon { get; set; }

        public int Player2GamesWon { get; set; }
    }
}
