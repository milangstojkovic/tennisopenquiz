using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Serilog;
using StackExchange.Redis;
using System;
using System.Threading.Tasks;
using TennisOpenQuizCashing.Models;

namespace TennisOpenQuizCashing
{
    public class RedisService
    {
        private ConnectionMultiplexer _redis;
        private readonly string _redisHost;
        private readonly int _redisPort;
        public RedisService(IConfiguration config)
        {
            _redisHost = config["Redis:Host"];
            _redisPort = Convert.ToInt32(config["Redis:Port"]);
        }
        public void Connect()
        {
            try
            {
                var configString = $"{_redisHost}:{_redisPort},connectRetry=5";
                _redis = ConnectionMultiplexer.Connect(configString);
            }
            catch (RedisConnectionException err)
            {
                Log.Error(err.ToString());
                throw err;
            }
            Log.Debug("Connected to Redis");
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
        public async Task<bool> Set(string key, string value)
        {
            var db = _redis.GetDatabase();
            return  db.StringSet(key, value);
        }

        public async Task<string> Get(string key)
        {
            var db = _redis.GetDatabase();
            return  db.StringGet(key);
        }
    }
}
