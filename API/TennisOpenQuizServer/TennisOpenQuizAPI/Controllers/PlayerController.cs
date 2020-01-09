﻿using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TennisOpenQuizAPI.Models;
using TennisOpenQuizAPI.Services;

namespace TennisOpenQuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly PlayerService playerService;
        public PlayerController()
        {
            playerService = new PlayerService();
        }
        // GET: api/Users
        [HttpGet]
        public IEnumerable<Player> Get()
        {
            return playerService.GetPlayers();
        }

        // GET: api/Users/5
        [HttpGet("{id}", Name = "player")]
        public Player Get(string id)
        {
            return playerService.GetPlayer(id);
        }

        // POST: api/Users
        [HttpPost]
        public void Post([FromBody] Player player)
        {
            playerService.AddPlayer(player);
        }
    }
}