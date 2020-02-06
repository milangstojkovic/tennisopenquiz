using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TennisOpenQuizCashing.Models;
using TennisOpenQuizCashing.RedisServices;


namespace TennisOpenQuizCashing.Controllers
{
    [Route("api/[controller]")]
    public class SetController : Controller
    {
        private readonly SetService _setService;
        private readonly RedisKeyGenerator redisKeyGenerator;
        public SetController(SetService setService)
        {
            _setService = setService;
            redisKeyGenerator = new RedisKeyGenerator();
        }
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{matchID}")]
        public Set Get(string matchID)
        {
            Set setToGetKey = new Set();
            setToGetKey.MatchID = matchID;
            string setKey = redisKeyGenerator.GenerateKey(setToGetKey);
            return _setService.GetSet(setKey);
        }

        [HttpPost]
        public Set Post([FromBody]Set value)
        {
            string setKey = redisKeyGenerator.GenerateKey(value);
            _setService.AddSet(value, setKey);
            return value;
        }
    }
}
