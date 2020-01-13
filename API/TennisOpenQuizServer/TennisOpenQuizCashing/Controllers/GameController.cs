using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TennisOpenQuizCashing.Models;
using TennisOpenQuizCashing.RedisServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public Game Get([FromBody]Game game)
        {
            string gameKey=redisKeyGenerator.GenerateKey(game);
            return _gameService.GetGame(gameKey);
        }

        // POST api/<controller>
        [HttpPost]
        public Game Post([FromBody]Game value)
        {
            string gameKey = redisKeyGenerator.GenerateKey(value);
            _gameService.AddGame(value, gameKey);
            return value;
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
