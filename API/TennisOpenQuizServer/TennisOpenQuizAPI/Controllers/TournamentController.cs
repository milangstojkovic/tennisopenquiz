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
        [HttpGet("{id}", Name = "GetTournament")]
        public Tournament Get(string id)
        {
            return tournamentService.GetTournament(id);
        }

        // POST: api/Users
        [HttpPost]
        public void Post([FromBody] Tournament tournament)
        {
            tournamentService.AddTournament(tournament);
        }
    }
}