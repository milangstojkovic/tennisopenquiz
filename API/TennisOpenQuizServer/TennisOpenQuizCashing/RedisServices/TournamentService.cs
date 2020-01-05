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
    public class TournamentService
    {
        private ConnectionMultiplexer _redis;
        private readonly string _redisHost;
        private readonly int _redisPort;
        public TournamentService(IConfiguration config)
        {
            _redisHost = config["Redis:Host"];
            _redisPort = Convert.ToInt32(config["Redis:Port"]);
        }
        public Tournament Function()
        {
            var configString = $"{_redisHost}:{_redisPort},connectRetry=5";
            _redis = ConnectionMultiplexer.Connect(configString);

            var db = _redis.GetDatabase();
            Tournament tour = new Tournament("1", "Proba", new DateTime(2019), "sljaka");
            db.StringSet("primer", JsonConvert.SerializeObject(tour));
            Tournament tourFromCache = JsonConvert.DeserializeObject<Tournament>(db.StringGet("primer"));

            return tourFromCache;
        }

    }
}
