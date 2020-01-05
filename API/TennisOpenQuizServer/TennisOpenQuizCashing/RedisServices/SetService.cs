using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using TennisOpenQuizCashing.Models;

namespace TennisOpenQuizCashing.RedisServices
{
    public class SetService
    {
        private ConnectionMultiplexer _redis;
        private readonly string _redisHost;
        private readonly int _redisPort;
        public SetService(IConfiguration config)
        {
            _redisHost = config["Redis:Host"];
            _redisPort = Convert.ToInt32(config["Redis:Port"]);
        }
        public void AddSet(Set set, string setKey)
        {
            var db = _redis.GetDatabase();
            db.StringSet(setKey, JsonConvert.SerializeObject(set));
        }

        public Set GetSet(string setKey)
        {
            var db = _redis.GetDatabase();
            Set setFromCache = JsonConvert.DeserializeObject<Set>(db.StringGet(setKey));
            return setFromCache;
        }
    }
}
