using Microsoft.Extensions.Configuration;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisOpenQuizCashing.PublishSubscribeServices
{
    public class PublishService
    {

        private readonly ConnectionMultiplexer _redis;
        private readonly string _redisHost;
        private readonly int _redisPort;
        public PublishService(IConfiguration config)
        {
            _redisHost = config["Redis:Host"];
            _redisPort = Convert.ToInt32(config["Redis:Port"]);

            var configString = $"{_redisHost}:{_redisPort},connectRetry=5";
            _redis = ConnectionMultiplexer.Connect(configString);
        }

        public void PublishMessage(string messageToPublish)
        {
            string channelName = "questionQuiz";
            var publisher = _redis.GetSubscriber();
            publisher.Publish(channelName, messageToPublish);
        }
    }
}
