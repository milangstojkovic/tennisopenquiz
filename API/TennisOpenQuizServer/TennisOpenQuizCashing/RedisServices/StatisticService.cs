using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using TennisOpenQuizCashing.Models;

namespace TennisOpenQuizCashing.RedisServices
{
    public class StatisticService
    {
        private readonly ConnectionMultiplexer _redis;
        private readonly string _redisHost;
        private readonly int _redisPort;
        public StatisticService(IConfiguration config)
        {
            _redisHost = config["Redis:Host"];
            _redisPort = Convert.ToInt32(config["Redis:Port"]);
            var configString = $"{_redisHost}:{_redisPort},connectRetry=5";
            _redis = ConnectionMultiplexer.Connect(configString);
        }
        public void AddStatistic(Statistic statistic, string statisticKey)
        {
            var db = _redis.GetDatabase();
            db.StringSet(statisticKey, JsonConvert.SerializeObject(statistic));
        }

        public Statistic GetStatistic(string statisticKey)
        {
            var db = _redis.GetDatabase();
            Statistic statisticFromCache = JsonConvert.DeserializeObject<Statistic>(db.StringGet(statisticKey));
            return statisticFromCache;
        }
    }
}
