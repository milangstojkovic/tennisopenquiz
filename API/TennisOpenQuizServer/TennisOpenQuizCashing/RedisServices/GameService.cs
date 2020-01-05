using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using TennisOpenQuizCashing.Models;

namespace TennisOpenQuizCashing.RedisServices
{
    public class GameService
    {
        private readonly ConnectionMultiplexer _redis;
        private readonly string _redisHost;
        private readonly int _redisPort;
        public GameService(IConfiguration config)
        {
            _redisHost = config["Redis:Host"];
            _redisPort = Convert.ToInt32(config["Redis:Port"]);

            var configString = $"{_redisHost}:{_redisPort},connectRetry=5";
            _redis = ConnectionMultiplexer.Connect(configString);
        }
        public void AddGame(Game game, string gameKey)
        {
            var db = _redis.GetDatabase();
            db.StringSet(gameKey, JsonConvert.SerializeObject(game));
        }

        public Game GetGame(string gameKey)
        {
            var db = _redis.GetDatabase();
            Game gameFromCache = JsonConvert.DeserializeObject<Game>(db.StringGet(gameKey));
            return gameFromCache;
        }
    }
}
