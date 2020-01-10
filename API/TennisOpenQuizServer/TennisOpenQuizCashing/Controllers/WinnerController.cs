using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TennisOpenQuizCashing.Models;
using TennisOpenQuizCashing.RedisServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public Winner Get([FromBody]Winner winner)
        {
            string winnerKey = redisKeyGenerator.GenerateKey(winner);
            return _winnerService.GetWinner(winnerKey);
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]Winner value)
        {
            string winnerKey = redisKeyGenerator.GenerateKey(value);

            _winnerService.AddWinner(value, winnerKey);
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
