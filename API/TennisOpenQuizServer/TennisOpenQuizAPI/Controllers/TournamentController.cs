using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TennisOpenQuizAPI.Models;
using TennisOpenQuizAPI.Services;

namespace TennisOpenQuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TournamentController : ControllerBase
    {
        private readonly TournamentService tournamentService;
        public TournamentController()
        {
            tournamentService = new TournamentService();
        }
        // GET: api/Users
        [HttpGet]
        public IEnumerable<Tournament> Get()
        {
            return tournamentService.GetTournaments();
        }

        // GET: api/Users/5
        [HttpGet("{name}", Name = "tournament")]
        public Tournament Get(string name)
        {
            return tournamentService.GetTournament(name);
        }

        // POST: api/Users
        [HttpPost]
        public void Post([FromBody] Tournament tournament)
        {
            tournamentService.AddTournament(tournament);
        }
    }
}