using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TennisOpenQuizCashing.Models;
using TennisOpenQuizCashing.RedisServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TennisOpenQuizCashing.Controllers
{
    [Route("api/[controller]")]
    public class QuestionAnswerController : Controller
    {
        private readonly QuestionAnswerService _questionAnswerService;
        public QuestionAnswerController(QuestionAnswerService questionAnswerService)
        {
            _questionAnswerService = questionAnswerService;
        }
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public QuestionAnswer Get(string id)
        {
            return _questionAnswerService.GetQuestionAnswer(id);
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]QuestionAnswer value, string key)
        {
            _questionAnswerService.AddQuestionAnswer(value, key);
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
