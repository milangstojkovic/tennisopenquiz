﻿using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TennisOpenQuizCashing.Models;

namespace TennisOpenQuizCashing.RedisServices
{
    public class WinnerService
    {
        private ConnectionMultiplexer _redis;
        private readonly string _redisHost;
        private readonly int _redisPort;
        public WinnerService(IConfiguration config)
        {
            _redisHost = config["Redis:Host"];
            _redisPort = Convert.ToInt32(config["Redis:Port"]);
        }
        public void AddSet(Winner winner, string winnerKey)
        {
            var db = _redis.GetDatabase();
            db.StringSet(winnerKey, JsonConvert.SerializeObject(winner));
        }

        public Winner GetSet(string winnerKey)
        {
            var db = _redis.GetDatabase();
            Winner winnerFromCache = JsonConvert.DeserializeObject<Winner>(db.StringGet(winnerKey));
            return winnerFromCache;
        }
    }
}
