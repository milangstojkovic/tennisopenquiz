using System;

namespace TennisOpenQuizCashing.Models
{
    public class Question
    {
        public Question()
        {

        }
        public Question(string questionText)
        {
            QuestionId = new Guid().ToString();
            QuestionText = questionText;
            Active = true;
        }
        public string QuestionId { get; set; }
        public string QuestionText { get; set; }
        public bool Active { get; set; }
    }
}
