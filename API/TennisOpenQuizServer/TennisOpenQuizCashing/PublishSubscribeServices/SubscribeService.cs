using Microsoft.Extensions.Configuration;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisOpenQuizCashing.PublishSubscribeServices
{
    public class SubscribeService
    {

        private readonly ConnectionMultiplexer _redis;
        private readonly string _redisHost;
        private readonly int _redisPort;
        public SubscribeService(IConfiguration config)
        {
            _redisHost = config["Redis:Host"];
            _redisPort = Convert.ToInt32(config["Redis:Port"]);

            var configString = $"{_redisHost}:{_redisPort},connectRetry=5";
            _redis = ConnectionMultiplexer.Connect(configString);
        }
        public string SubscribeMessaging()
        {
            string channelName = "questionQuiz";
            string messageIGot = "";

            var subscriber = _redis.GetSubscriber();

            subscriber.Subscribe(channelName).OnMessage(async channelMessage =>
            {
                await Task.Delay(1000);
                messageIGot = (string)channelMessage.Message;
            });
            return messageIGot;
        }


    }
}
