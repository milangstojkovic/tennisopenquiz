using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
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
        public IEnumerable<Question> GetQuestions()
        {
            var configString = $"{_redisHost}:{_redisPort}";
            var db2 = _redis.GetDatabase();

            var db = _redis.GetServer(configString);
            IEnumerable<RedisKey> dbKeys = db.Keys();
            List<Question> questions = new List<Question>();
            foreach(RedisKey key in dbKeys)
            {
                Question questionFromCache = JsonConvert.DeserializeObject<Question>(db2.StringGet(key.ToString()));
                questions.Add(questionFromCache);
            }
            return questions;
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
        public Question EditQuestion(Question question, string questionKey)
        {
            var db = _redis.GetDatabase();
            db.StringSet(questionKey, JsonConvert.SerializeObject(question));
            return question;
        }
    }
}
