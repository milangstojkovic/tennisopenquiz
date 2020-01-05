using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using TennisOpenQuizCashing.Models;

namespace TennisOpenQuizCashing.RedisServices
{
    public class QuestionService
    {
        private readonly ConnectionMultiplexer _redis;
        private readonly string _redisHost;
        private readonly int _redisPort;
        public QuestionService(IConfiguration config)
        {
            _redisHost = config["Redis:Host"];
            _redisPort = Convert.ToInt32(config["Redis:Port"]);

            var configString = $"{_redisHost}:{_redisPort},connectRetry=5";
            _redis = ConnectionMultiplexer.Connect(configString);
        }

        public void AddQuestion(Question question, string questionKey)
        {
            var db = _redis.GetDatabase();
            db.StringSet(questionKey, JsonConvert.SerializeObject(question));
        }
        public void AddFakeQuestion(Question question, string questionKey)
        {
            
            var db = _redis.GetDatabase();
            Question question1 = new Question("Kako se zoves?");
            db.StringSet("pitam", JsonConvert.SerializeObject(question1));
        }
        public Question GetQuestion(string questionKey)
        {
            var db = _redis.GetDatabase();
            Question questionFromCache = JsonConvert.DeserializeObject<Question>(db.StringGet(questionKey));
            return questionFromCache;
        }
        public Question GetFakeQuestion(string questionKey)
        {
            var db = _redis.GetDatabase();
            Question questionFromCache = JsonConvert.DeserializeObject<Question>(db.StringGet("pitam"));
            if (questionFromCache == null)
                return null;
            else
                return questionFromCache;
        }
    }
}
