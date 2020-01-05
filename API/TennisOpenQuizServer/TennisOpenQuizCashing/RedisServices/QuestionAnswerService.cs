using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using TennisOpenQuizCashing.Models;

namespace TennisOpenQuizCashing.RedisServices
{
    public class QuestionAnswerService
    {
        private readonly ConnectionMultiplexer _redis;
        private readonly string _redisHost;
        private readonly int _redisPort;
        public QuestionAnswerService(IConfiguration config)
        {
            _redisHost = config["Redis:Host"];
            _redisPort = Convert.ToInt32(config["Redis:Port"]);
            var configString = $"{_redisHost}:{_redisPort},connectRetry=5";
            _redis = ConnectionMultiplexer.Connect(configString);
        }
        public void AddQuestionAnswer(QuestionAnswer questionAnswer, string questionAnswerKey)
        {
            var db = _redis.GetDatabase();
            db.StringSet(questionAnswerKey, JsonConvert.SerializeObject(questionAnswer));
        }

        public QuestionAnswer GetQuestionAnswer(string questionAnswerKey)
        {
            var db = _redis.GetDatabase();
            QuestionAnswer questionAnswerFromCache = JsonConvert.DeserializeObject<QuestionAnswer>(db.StringGet(questionAnswerKey));
            return questionAnswerFromCache;
        }
    }
}
