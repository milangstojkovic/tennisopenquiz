using System;
using System.Collections.Generic;

namespace TennisOpenQuizCashing.Models
{
    public class Question
    {
        public Question()
        {

        }
        public Question(string questionText)
        {
            QuestionId = Guid.NewGuid().ToString();
            QuestionText = questionText;
            Active = true;
        }
        public string QuestionId { get; set; }
        public string QuestionText { get; set; }
        public bool Active { get; set; }
    }
}
