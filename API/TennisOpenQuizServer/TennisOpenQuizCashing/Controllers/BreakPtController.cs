using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TennisOpenQuizCashing.Models;
using TennisOpenQuizCashing.RedisServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TennisOpenQuizCashing.Controllers
{
    [Route("api/[controller]")]
    public class BreakptController : Controller
    {
        private readonly BreakPtService breakPtService;
        private readonly RedisKeyGenerator redisKeyGenerator;
        public BreakptController(BreakPtService breakPtService)
        {
            this.breakPtService = breakPtService;

            redisKeyGenerator = new RedisKeyGenerator();
        }
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{matchID}")]
        public BreakPt Get(string matchID)
        {
            BreakPt breakPtToGetKey = new BreakPt();
            breakPtToGetKey.MatchID = matchID;
            string breakPtKey = redisKeyGenerator.GenerateKey(breakPtToGetKey);
            return breakPtService.GetBreakPt(breakPtKey);
        }

        [HttpPost]
        public BreakPt Post([FromBody]BreakPt value)
        {
            string breakPtKey = redisKeyGenerator.GenerateKey(value);

            breakPtService.AddBreakPt(value, breakPtKey);
            return value;
        }
    }
}
