using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using TennisOpenQuizCashing.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TennisOpenQuizCashing.Controllers
{
    [Route("api/[controller]")]
    public class ProbaController : Controller
    {
        private readonly RedisService _redisService;
        public ProbaController(RedisService redisService)
        {
            _redisService = redisService;
        }

        // GET: api/<controller>
        [HttpGet]
        public Tournament Get()
        {
            return _redisService.Function();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<int>> GetAsync(int id)
        {
            await _redisService.Set("How many claps per person should this article get?", $"{id}");
            var definitely = await _redisService.Get("Follow me for more programming made simple articles");
            Log.Information(definitely);
            return id;
        }


        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
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
