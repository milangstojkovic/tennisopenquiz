using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using TennisOpenQuizCashing.Models;

namespace TennisOpenQuizCashing.RedisServices
{
    public class QuestionService
    {
        private ConnectionMultiplexer _redis;
        private readonly string _redisHost;
        private readonly int _redisPort;
        public QuestionService(IConfiguration config)
        {
            _redisHost = config["Redis:Host"];
            _redisPort = Convert.ToInt32(config["Redis:Port"]);
        }

        public void AddQuestion(Question question, string questionKey)
        {
            var db = _redis.GetDatabase();
            db.StringSet(questionKey, JsonConvert.SerializeObject(question));
        }

        public Question GetQuestion(string questionKey)
        {
            var db = _redis.GetDatabase();
            Question questionFromCache = JsonConvert.DeserializeObject<Question>(db.StringGet(questionKey));
            return questionFromCache;
        }
    }
}
