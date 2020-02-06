using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TennisOpenQuizCashing.Models;
using TennisOpenQuizCashing.RedisServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TennisOpenQuizCashing.Controllers
{
    [Route("api/[controller]")]
    public class StatisticController : Controller
    {
        private readonly StatisticService _statisticService;
        private readonly RedisKeyGenerator redisKeyGenerator;
        public StatisticController(StatisticService statisticService)
        {
            _statisticService = statisticService;
            redisKeyGenerator = new RedisKeyGenerator();
        }
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet("{matchID}")]
        public Statistic Get(string matchID)
        {
            Statistic statisticToGetKey = new Statistic();
            statisticToGetKey.MatchID = matchID;
            string statisticKey = redisKeyGenerator.GenerateKey(statisticToGetKey);
            return _statisticService.GetStatistic(statisticKey);
        }

        // POST api/<controller>
        [HttpPost]
        public Statistic Post([FromBody]Statistic value)
        {
            string statisticKey = redisKeyGenerator.GenerateKey(value);
            _statisticService.AddStatistic(value, statisticKey);
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
