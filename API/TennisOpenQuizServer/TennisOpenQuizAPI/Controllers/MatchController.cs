using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TennisOpenQuizAPI.Models;
using TennisOpenQuizAPI.Services;

namespace TennisOpenQuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchController : ControllerBase
    {
        private readonly MatchService matchService;
        public MatchController()
        {
            matchService = new MatchService();
        }
        // GET: api/Users
        [HttpGet]
        public IEnumerable<Match> Get()
        {
            return matchService.GetMatches();
        }

        // GET: api/Users/5
        [HttpGet("{id}", Name = "GetMatch")]
        public Match Get(string id)
        {
            return matchService.GetMatch(id);
        }

        // POST: api/Users
        [HttpPost]
        public void Post([FromBody] Match match)
        {
            matchService.AddMatch(match);
        }
    }
}