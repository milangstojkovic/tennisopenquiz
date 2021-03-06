﻿using Microsoft.AspNetCore.Mvc;
using TennisOpenQuizAPI.Models;
using TennisOpenQuizAPI.Services;

namespace TennisOpenQuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticController : ControllerBase
    {
        private readonly StatisticService statisticService;
        public StatisticController()
        {
            statisticService = new StatisticService();
        }

        // GET: api/Users/5
        [HttpGet("{id}", Name = "statistic")]
        public Statistic Get(string id)
        {
            return statisticService.GetStatistic(id);
        }

        // POST: api/Users
        [HttpPost]
        public void Post([FromBody] Statistic statistic)
        {
            statisticService.AddStatistic(statistic);
        }
    }
}