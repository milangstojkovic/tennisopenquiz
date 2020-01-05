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
    public class BreakPtController : ControllerBase
    {
        private readonly BreakPtService breakPtService;
        public BreakPtController()
        {
            breakPtService = new BreakPtService();
        }

        // GET: api/Users/5
        [HttpGet("{id}", Name = "GetBreakPt")]
        public BreakPt Get(string id)
        {
            return breakPtService.GetBreakPt(id);
        }

        // POST: api/Users
        [HttpPost]
        public void Post([FromBody] BreakPt breakPt)
        {
            breakPtService.AddBreakPt(breakPt);
        }
    }
}