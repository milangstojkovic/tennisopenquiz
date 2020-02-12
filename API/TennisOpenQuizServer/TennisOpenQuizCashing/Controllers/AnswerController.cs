using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TennisOpenQuizCashing.Models;
using TennisOpenQuizCashing.RedisServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TennisOpenQuizCashing.Controllers
{
    [Route("api/[controller]")]
    public class AnswerController : Controller
    {
        private readonly AnswerService answerService;
        private readonly RedisKeyGenerator redisKeyGenerator;
        public AnswerController(AnswerService answerService)
        {
            this.answerService = answerService;
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
        public string Get(string id)
        {
            return answerService.GetAnswer(id);
        }

        // POST api/<controller>
        [HttpPost]
        public Answer Post([FromBody]Answer value)
        {
            string answerKey = redisKeyGenerator.GenerateKey(value);

            answerService.AddAnswer(value, answerKey);
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
