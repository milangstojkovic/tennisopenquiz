﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cassandra;
using TennisOpenQuizAPI.Models;
namespace TennisOpenQuizAPI.Services
{
    public class UserService
    {
        public UserService()
        {

        }
        public List<User> GetUsers()
        {
            ISession session = SessionManager.GetSession();
            List<User> usersList = new List<User>();
            if (session == null)
                return null;
            var UsersData = session.Execute("select * from \"User\"");
            foreach (var UserData in UsersData)
            {
                User user = new User();
                user.UserID = UserData["userid"] != null ? UserData["userid"].ToString() : string.Empty;
                user.Username = UserData["username"] != null ? UserData["username"].ToString() : string.Empty;
                user.Email = UserData["email"] != null ? UserData["email"].ToString() : string.Empty;
                user.Password = UserData["password"] != null ? UserData["password"].ToString() : string.Empty;
                user.Score = UserData["score"] != null ? Int32.Parse(UserData["score"].ToString()) : 0;
                usersList.Add(user);
            }
            return usersList;
        }

        public User GetUser(string userID)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return null;
            var UserData = session.Execute("select * from user where userid='"+userID+"'").FirstOrDefault();
            User user = new User();
            if (UserData != null)
            {
                user.UserID = UserData["userid"] != null ? UserData["userid"].ToString() : string.Empty;
                user.Username = UserData["username"] != null ? UserData["username"].ToString() : string.Empty;
                user.Email = UserData["email"] != null ? UserData["email"].ToString() : string.Empty;
                user.Password = UserData["password"] != null ? UserData["password"].ToString() : string.Empty;
                user.Score = UserData["score"] != null ? Int32.Parse(UserData["score"].ToString()) : 0;
            }
            return user;
        }

        public void AddUser(User user)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return;
            RowSet userData = session.Execute("insert into user (userid, username, email, password, score)  values ('" + user.UserID + "', '"+user.Username+"', '"+user.Email+"', '"+user.Password+"', '0')");
        }
    }
}