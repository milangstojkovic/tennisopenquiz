namespace TennisOpenQuizCashing.Models
{
    public class Answer
    {
        public Answer()
        {

        }
        public string AnswerId { get; set; }
        public string AnswerText { get; set; }
        public bool Correct { get; set; }
        public int Points { get; set; }
        public string QuestionId { get; set; }
    }
}