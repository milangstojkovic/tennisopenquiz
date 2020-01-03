﻿using System;
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
            var playersData = session.Execute("select * from player");
            foreach (var playerData in playersData)
            {
                Player player = new Player();
                player.PlayerID = playerData["playerid"] != null ? playerData["playerid"].ToString() : string.Empty;
                player.Name = playerData["name"] != null ? playerData["name"].ToString() : string.Empty;
                player.Surname = playerData["surname"] != null ? playerData["surname"].ToString() : string.Empty;
                player.Ranking = playerData["ranking"] != null ?Int32.Parse(playerData["ranking"].ToString()) : 0;
                player.Score = playerData["score"] != null ? Int32.Parse(playerData["score"].ToString()) : 0;
                player.BirthDate = playerData["birthdate"] != null ? DateTime.Parse(playerData["birthdate"].ToString()) : DateTime.MinValue;
                playersList.Add(player);
            }
            return playersList;
        }
        public Player GetPlayer(string playerID)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return null;
            var playerData = session.Execute("select * from player where playerid = '"+playerID+"'").FirstOrDefault();
            Player player = new Player();
            if (playerData != null)
            {
                player.PlayerID = playerData["playerid"] != null ? playerData["playerid"].ToString() : string.Empty;
                player.Name = playerData["name"] != null ? playerData["name"].ToString() : string.Empty;
                player.Surname = playerData["surname"] != null ? playerData["surname"].ToString() : string.Empty;
                player.Ranking = playerData["ranking"] != null ? Int32.Parse(playerData["ranking"].ToString()) : 0;
                player.Score = playerData["score"] != null ? Int32.Parse(playerData["score"].ToString()) : 0;
                player.BirthDate = playerData["birthdate"] != null ? DateTime.Parse(playerData["birthdate"].ToString()) : DateTime.MinValue;
            }
            return player;
        }

        public void AddPlayer(Player player)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return;
            RowSet userData = session.Execute("insert into player (playerid, name, surname, ranking, score, birthdate)  values ('" + player.PlayerID + "', '" + player.Name + "', '" + player.Surname + "', '" + player.Ranking + "', '"+player.Score+"', '"+player.BirthDate+"')");
        }
    }
}