using System;

namespace TennisOpenQuizAPI.Models
{
    public class Player
    {
        public string PlayerID { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public int Ranking { get; set; }

        public int Score { get; set; }

        public DateTime BirthDate { get; set; }
    }
}
