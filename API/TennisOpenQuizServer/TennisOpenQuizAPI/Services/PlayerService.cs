using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cassandra;
using TennisOpenQuizAPI.Models;

namespace TennisOpenQuizAPI.Services
{
    public class PlayerService
    {
        public List<Player> GetPlayers()
        {
            ISession session = SessionManager.GetSession();
            List<Player> playersList = new List<Player>();
            if (session == null)
                return null;
            var playersData = session.Execute("select * from \"Player\"");
            foreach (var playerData in playersData)
            {
                Player player = new Player();
                player.PlayerID = playerData["PlayerID"] != null ? (Guid)playerData["PlayerID"] : Guid.Empty;
                player.Name = playerData["Name"] != null ? playerData["Name"].ToString() : string.Empty;
                player.Surname = playerData["Surname"] != null ? playerData["Surname"].ToString() : string.Empty;
                player.Ranking = playerData["Ranking"] != null ?Int32.Parse(playerData["Ranking"].ToString()) : 0;
                player.Score = playerData["Score"] != null ? Int32.Parse(playerData["Score"].ToString()) : 0;
                player.BirthDate = playerData["BirthDate"] != null ? DateTime.Parse(playerData["BirthDate"].ToString()) : DateTime.MinValue;
                playersList.Add(player);
            }
            return playersList;
        }
        public Player GetPlayer(Guid playerID)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return null;
            var playerData = session.Execute("select * from \"Player\" where \"PlayerID\" = '"+playerID+"'").FirstOrDefault();
            Player player = new Player();
            if (playerData != null)
            {
                player.PlayerID = playerData["PlayerID"] != null ? (Guid)playerData["PlayerID"] : Guid.Empty;
                player.Name = playerData["Name"] != null ? playerData["Name"].ToString() : string.Empty;
                player.Surname = playerData["Surname"] != null ? playerData["Surname"].ToString() : string.Empty;
                player.Ranking = playerData["Ranking"] != null ? Int32.Parse(playerData["Ranking"].ToString()) : 0;
                player.Score = playerData["Score"] != null ? Int32.Parse(playerData["Score"].ToString()) : 0;
                player.BirthDate = playerData["BirthDate"] != null ? DateTime.Parse(playerData["BirthDate"].ToString()) : DateTime.MinValue;
            }
            return player;
        }

        public void AddPlayer(Player player)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return;
            RowSet userData = session.Execute("insert into \"Player\" (\"PlayerID\", Name, Surname, Ranking, Score, BirthDate)  values ('" + player.PlayerID + "', '" + player.Name + "', '" + player.Surname + "', '" + player.Ranking + "', '"+player.Score+"', '"+player.BirthDate+"')");
        }
    }
}
