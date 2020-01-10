using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TennisOpenQuizCashing.Models;
using TennisOpenQuizCashing.RedisServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TennisOpenQuizCashing.Controllers
{
    [Route("api/[controller]")]
    public class QuestionController : Controller
    {
        private readonly QuestionService _questionService;
        private readonly RedisKeyGenerator redisKeyGenerator;
        public QuestionController(QuestionService questionService)
        {
            _questionService = questionService;
            redisKeyGenerator = new RedisKeyGenerator();
        }
        // GET: api/<controller>
        [HttpGet]
        public Question Get()
        {
            _questionService.AddFakeQuestion(null, "pitam");
            return _questionService.GetFakeQuestion("pitam");
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public Question Get([FromBody]Question question)
        {
            string questionKey = redisKeyGenerator.GenerateKey(question);
            return _questionService.GetQuestion(questionKey);
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]Question value)
        {
            string questionKey = redisKeyGenerator.GenerateKey(value);
            _questionService.AddQuestion(value, questionKey);
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
