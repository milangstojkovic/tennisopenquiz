using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TennisOpenQuizCashing.Models;
using TennisOpenQuizCashing.RedisServices;


namespace TennisOpenQuizCashing.Controllers
{
    [Route("api/[controller]")]
    public class GameController : Controller
    {
        private readonly GameService _gameService;
        private readonly RedisKeyGenerator redisKeyGenerator;
        public GameController(GameService gameService)
        {
            _gameService = gameService;
            redisKeyGenerator = new RedisKeyGenerator();
        }
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{id}")]
        public Game Get([FromBody]Game game)
        {
            string gameKey=redisKeyGenerator.GenerateKey(game);
            return _gameService.GetGame(gameKey);
        }

        [HttpGet("{matchID}")]
        public Game Get(string matchID)
        {
            Game gameToGetKey = new Game();
            gameToGetKey.MatchId = matchID;
            string gameKey = redisKeyGenerator.GenerateKey(gameToGetKey);
            return _gameService.GetGame(gameKey);
        }
    }
}
