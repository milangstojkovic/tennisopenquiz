﻿using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TennisOpenQuizAPI.Models;
using TennisOpenQuizAPI.Services;

namespace TennisOpenQuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService userService;
        public UsersController()
        {
            userService = new UserService();
        }
        // GET: api/Users
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return userService.GetUsers();
        }

        // GET: api/Users/5
        [HttpGet("{id}", Name = "user")]
        public User Get(string id)
        {
            return userService.GetUser(id);
        }

        // POST: api/Users
        [HttpPost]
        public void Post([FromBody] User user)
        {
            userService.AddUser(user);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
