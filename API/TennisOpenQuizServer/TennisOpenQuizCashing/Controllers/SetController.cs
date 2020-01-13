using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TennisOpenQuizCashing.Models;
using TennisOpenQuizCashing.RedisServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public Set Get([FromBody]Set set)
        {
            string setKey = redisKeyGenerator.GenerateKey(set);
            return _setService.GetSet(setKey);
        }

        // POST api/<controller>
        [HttpPost]
        public Set Post([FromBody]Set value)
        {
            string setKey = redisKeyGenerator.GenerateKey(value);
            _setService.AddSet(value, setKey);
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
