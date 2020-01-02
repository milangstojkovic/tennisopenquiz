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
        public string QuestionID { get; set; }
        public string AnswerID { get; set; }
        public string UserID { get; set; }
    }
}
