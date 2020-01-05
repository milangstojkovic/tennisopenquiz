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
    public class StatisticService
    {
        private ConnectionMultiplexer _redis;
        private readonly string _redisHost;
        private readonly int _redisPort;
        public StatisticService(IConfiguration config)
        {
            _redisHost = config["Redis:Host"];
            _redisPort = Convert.ToInt32(config["Redis:Port"]);
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
