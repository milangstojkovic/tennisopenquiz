using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisOpenQuizCashing.Models
{
    public class Question
    {
        public Question()
        {

        }

        public string QuestionText { get; set; }
        public List<Answer> Answers { get; set; }
        public bool Active { get; set; }
    }
}
