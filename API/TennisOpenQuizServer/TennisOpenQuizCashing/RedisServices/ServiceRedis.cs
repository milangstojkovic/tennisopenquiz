﻿using Microsoft.Extensions.Configuration;
using Serilog;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisOpenQuizCashing.RedisServices
{
    public class ServiceRedis
    {
        private ConnectionMultiplexer _redis;
        private readonly string _redisHost;
        private readonly int _redisPort;
        public ServiceRedis(IConfiguration config)
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
    }
}
