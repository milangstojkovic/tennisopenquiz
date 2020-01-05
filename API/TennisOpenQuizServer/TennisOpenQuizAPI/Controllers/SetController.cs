using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TennisOpenQuizAPI.Models;
using TennisOpenQuizAPI.Services;

namespace TennisOpenQuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SetController : ControllerBase
    {
        private readonly SetService setService;
        public SetController()
        {
            setService = new SetService();
        }

        // GET: api/Users/5
        [HttpGet("{id}", Name = "GetSet")]
        public List<Set> Get(string id)
        {
            return setService.GetSets(id);
        }

        // POST: api/Users
        [HttpPost]
        public void Post([FromBody] Set set)
        {
            setService.AddSet(set);
        }
    }
}