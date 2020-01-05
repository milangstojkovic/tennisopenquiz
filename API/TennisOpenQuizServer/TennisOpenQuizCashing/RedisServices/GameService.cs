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
    public class GameService
    {
        private ConnectionMultiplexer _redis;
        private readonly string _redisHost;
        private readonly int _redisPort;
        public GameService(IConfiguration config)
        {
            _redisHost = config["Redis:Host"];
            _redisPort = Convert.ToInt32(config["Redis:Port"]);
        }
        public void AddSet(Game game, string gameKey)
        {
            var db = _redis.GetDatabase();
            db.StringSet(gameKey, JsonConvert.SerializeObject(game));
        }

        public Game GetSet(string gameKey)
        {
            var db = _redis.GetDatabase();
            Game gameFromCache = JsonConvert.DeserializeObject<Game>(db.StringGet(gameKey));
            return gameFromCache;
        }
    }
}
