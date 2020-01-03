using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisOpenQuizCashing.Models
{
    public class QuestionAnswer
    {
        public QuestionAnswer()
        {

        }
        public string QuestionId { get; set; }
        public string AnswerId { get; set; }
        public string UserId { get; set; }
        public int PointsWon { get; set; }
    }
}
