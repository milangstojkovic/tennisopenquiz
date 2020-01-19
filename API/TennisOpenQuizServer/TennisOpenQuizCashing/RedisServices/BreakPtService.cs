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
    public class BreakPtService
    {
        private readonly ConnectionMultiplexer _redis;
        private readonly string _redisHost;
        private readonly int _redisPort;
        public BreakPtService(IConfiguration config)
        {
            _redisHost = config["Redis:Host"];
            _redisPort = Convert.ToInt32(config["Redis:Port"]);
            var configString = $"{_redisHost}:{_redisPort},connectRetry=5";
            _redis = ConnectionMultiplexer.Connect(configString);
        }
        public void AddBreakPt(BreakPt breakPt, string breakPtKey)
        {
            var db = _redis.GetDatabase();
            db.StringSet(breakPtKey, JsonConvert.SerializeObject(breakPt));
        }

        public BreakPt GetBreakPt(string breakPtKey)
        {
            var db = _redis.GetDatabase();
            BreakPt breakPtFromCache = JsonConvert.DeserializeObject<BreakPt>(db.StringGet(breakPtKey));
            return breakPtFromCache;
        }
    }
}
