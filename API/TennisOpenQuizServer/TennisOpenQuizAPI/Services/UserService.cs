using System;
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
                user.UserID = UserData["UserID"] != null ? UserData["UserID"].ToString() : string.Empty;
                user.Username = UserData["Username"] != null ? UserData["Username"].ToString() : string.Empty;
                user.Email = UserData["Email"] != null ? UserData["Email"].ToString() : string.Empty;
                user.Password = UserData["Password"] != null ? UserData["Password"].ToString() : string.Empty;
                user.Score = UserData["Score"] != null ? Int32.Parse(UserData["Score"].ToString()) : 0;
                usersList.Add(user);
            }
            return usersList;
        }

        public User GetUser(string userID)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return null;
            var UserData = session.Execute("select * from \"User\" where \"userID\"='"+userID+"'").FirstOrDefault();
            User user = new User();
            if (UserData != null)
            {
                user.UserID = UserData["UserID"] != null ? UserData["UserID"].ToString() : string.Empty;
                user.Username = UserData["Username"] != null ? UserData["Username"].ToString() : string.Empty;
                user.Email = UserData["Email"] != null ? UserData["Email"].ToString() : string.Empty;
                user.Password = UserData["Password"] != null ? UserData["Password"].ToString() : string.Empty;
                user.Score = UserData["Score"] != null ? Int32.Parse(UserData["Score"].ToString()) : 0;
            }
            return user;
        }

        public void AddUser(User user)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return;
            RowSet userData = session.Execute("insert into \"User\" (\"UserID\", Username, Email, Password, Score)  values ('" + user.UserID + "', '"+user.Username+"', '"+user.Email+"', '"+user.Password+"', '0')");
        }
    }
}
