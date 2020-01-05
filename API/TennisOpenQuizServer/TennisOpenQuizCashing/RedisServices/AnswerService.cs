using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using TennisOpenQuizCashing.Models;

namespace TennisOpenQuizCashing.RedisServices
{
    public class AnswerService
    {
        private ConnectionMultiplexer _redis;
        private readonly string _redisHost;
        private readonly int _redisPort;
        public AnswerService(IConfiguration config)
        {
            _redisHost = config["Redis:Host"];
            _redisPort = Convert.ToInt32(config["Redis:Port"]);
        }
        public void AddAnswer(Answer answer, string answerKey)
        {
            var db = _redis.GetDatabase();
            db.StringSet(answerKey, JsonConvert.SerializeObject(answer));
        }

        public Answer GetAnswer(string answerKey)
        {
            var db = _redis.GetDatabase();
            Answer answerFromCache = JsonConvert.DeserializeObject<Answer>(db.StringGet(answerKey));
            return answerFromCache;
        }
    }
}
