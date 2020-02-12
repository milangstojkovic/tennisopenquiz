 using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TennisOpenQuizCashing.Models;

namespace TennisOpenQuizCashing.RedisServices
{
    public class AnswerService
    {
        private readonly ConnectionMultiplexer _redis;
        private readonly string _redisHost;
        private readonly int _redisPort;
        public AnswerService(IConfiguration config)
        {
            _redisHost = config["Redis:Host"];
            _redisPort = Convert.ToInt32(config["Redis:Port"]);

            var configString = $"{_redisHost}:{_redisPort},connectRetry=5";
            _redis = ConnectionMultiplexer.Connect(configString);
        }
        public void AddAnswer(Answer answer, string answerKey)
        {
            var db = _redis.GetDatabase();
            db.StringSet(answerKey, answer.AnswerValue);
        }

        public string GetAnswer(string answerKey)
        {
            var db = _redis.GetDatabase();
            
            string answer = db.StringGet(answerKey);
            return answer;
        }
    }
}
