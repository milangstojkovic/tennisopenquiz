using System.Collections.Generic;

namespace TennisOpenQuizCashing.Models
{
    public class Question
    {
        public Question()
        {

        }
        public string QuestionId { get; set; }
        public string QuestionText { get; set; }
        public List<Answer> Answers { get; set; }
        public bool Active { get; set; }
    }
}
