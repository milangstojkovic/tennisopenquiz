using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TennisOpenQuizAPI.Models;
using TennisOpenQuizAPI.Services;

namespace TennisOpenQuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WinnerController : ControllerBase
    {
        private readonly WinnerService winnerService;
        public WinnerController()
        {
            winnerService = new WinnerService();
        }

        // GET: api/Users/5
        [HttpGet("{id}", Name = "winner")]
        public Winner Get(string id)
        {
            return winnerService.GetWinner(id);
        }

        // POST: api/Users
        [HttpPost]
        public void Post([FromBody] Winner winner)
        {
            winnerService.AddWinner(winner);
        }
    }
}