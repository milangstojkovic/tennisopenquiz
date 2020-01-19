using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TennisOpenQuizCashing.Models;
using TennisOpenQuizCashing.RedisServices;

namespace TennisOpenQuizCashing.Controllers
{
    [Route("api/[controller]")]
    public class WinnerController : Controller
    {
        private readonly WinnerService _winnerService;
        private readonly RedisKeyGenerator redisKeyGenerator;
        public WinnerController(WinnerService winnerService)
        {
            _winnerService = winnerService;

            redisKeyGenerator = new RedisKeyGenerator();
        }
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{matchID}")]
        public Winner Get(string matchID)
        {
            Winner winnerToGetKey = new Winner();
            winnerToGetKey.MatchID = matchID;
            string winnerKey = redisKeyGenerator.GenerateKey(winnerToGetKey);
            return _winnerService.GetWinner(winnerKey);
        }

        [HttpPost]
        public Winner Post([FromBody]Winner value)
        {
            string winnerKey = redisKeyGenerator.GenerateKey(value);

            _winnerService.AddWinner(value, winnerKey);
            return value;
        }
    }
}
