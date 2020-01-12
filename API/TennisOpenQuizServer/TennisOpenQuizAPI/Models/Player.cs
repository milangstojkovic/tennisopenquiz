using System;

namespace TennisOpenQuizAPI.Models
{
    public class Player
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public int Ranking { get; set; }

        public int Score { get; set; }

        public string Country { get; set; }

        public DateTime BirthDate { get; set; }
    }
}
