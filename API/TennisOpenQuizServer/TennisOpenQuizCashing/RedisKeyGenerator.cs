using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TennisOpenQuizCashing.Models;

namespace TennisOpenQuizCashing
{
    public class RedisKeyGenerator
    {
        public RedisKeyGenerator()
        {

        }
        public string GenerateKey(object obj)
        {
            Type someObject = obj.GetType();

            string generatedKey;
            if (someObject == typeof(Question))
                generatedKey = GenerateKeyForQuestion((Question)obj);
            else if (someObject == typeof(Answer))
                generatedKey = GenerateKeyForAnswer((Answer)obj);
            else if (someObject == typeof(QuestionAnswer))
                generatedKey = GenerateKeyForQuestionAnswer((QuestionAnswer)obj);
            else if (someObject == typeof(Statistic))
                generatedKey = GenerateKeyForStatistic((Statistic)obj);
            else if (someObject == typeof(Game))
                generatedKey = GenerateKeyForGame((Game)obj);
            else if (someObject == typeof(Set))
                generatedKey = GenerateKeyForSet((Set)obj);
            else if (someObject == typeof(Winner))
                generatedKey = GenerateKeyForWinner((Winner)obj);
            else if (someObject == typeof(BreakPt))
                generatedKey = GenerateKeyForBreakPt((BreakPt)obj);
            else generatedKey = "";

            return generatedKey;
        }

        private string GenerateKeyForWinner(Winner winner)
        {
            string firstKeyPart = winner.MatchID;

            string generatedKeyForWinner = "-" + firstKeyPart + "_winner";

            return generatedKeyForWinner;
        }

        private string GenerateKeyForSet(Set set)
        {
            string firstKeyPart = set.MatchID;

            string generatedKeyForSet = "-" + firstKeyPart + "_set";

            return generatedKeyForSet;
        }

        private string GenerateKeyForGame(Game game)
        {
            string firstKeyPart = game.MatchId;
            
            string generatedKeyForGame = "-" + firstKeyPart + "_game";

            return generatedKeyForGame;
        }
        private string GenerateKeyForBreakPt(BreakPt breakPt)
        {
            string firstKeyPart = breakPt.MatchID;

            string generatedKeyForGame = "-" + firstKeyPart + "_breakPt";

            return generatedKeyForGame;
        }

        private string GenerateKeyForStatistic(Statistic statistic)
        {
            string firstKeyPart = statistic.MatchID;
            
            string generatedKeyForStatistic = "-"  + firstKeyPart + "_statistic";

            return generatedKeyForStatistic;
        }

        private string GenerateKeyForQuestionAnswer(QuestionAnswer questionAnswer)
        {
            string firstKeyPart = questionAnswer.AnswerId+
                                  questionAnswer.QuestionId;
            string secondKeyPart = questionAnswer.UserId;
            string generatedKeyForAnswer = firstKeyPart + "-" + secondKeyPart + "_";

            return generatedKeyForAnswer;
        }

        private string GenerateKeyForAnswer(Answer answer)
        {
            string firstKeyPart = answer.AnswerId;
            int halfAnswerTextLength = answer.AnswerText.Length / 2;
            string secondKeyPart = answer.AnswerText.Substring(0,halfAnswerTextLength)+
                                 answer.Points.ToString()+answer.QuestionId;
            string generatedKeyForAnswer = firstKeyPart +"-"+ secondKeyPart+"_";

            return generatedKeyForAnswer;
        }

        private string GenerateKeyForQuestion(Question question)
        {
            string firstKeyPart = question.QuestionId;
            string secondKeyPart = Regex.Replace(question.QuestionText, @"\s", "");

            string generatedKeyForQuestion = firstKeyPart +"-"+ secondKeyPart+"_";
            return generatedKeyForQuestion;
        }
    }
}
