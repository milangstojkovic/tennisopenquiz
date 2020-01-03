using System.Collections.Generic;

namespace TennisOpenQuizAPI.Models
{
    public class User
    {
        public string UserID { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public int Score { get; set; }

        public List<int> ScoreHistory { get; set; }
    }
}
