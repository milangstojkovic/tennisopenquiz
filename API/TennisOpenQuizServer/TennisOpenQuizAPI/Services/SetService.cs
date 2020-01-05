using Cassandra;
using System;
using System.Collections.Generic;
using TennisOpenQuizAPI.Models;

namespace TennisOpenQuizAPI.Services
{
    public class SetService
    {
        public static List<Set> GetSets(string matchID)
        {
            ISession session = SessionManager.GetSession();
            List<Set> setsList = new List<Set>();
            if (session == null)
                return null;
            var SetsData = session.Execute("select * from set where matchid ='" + matchID + "'");
            foreach (var SetData in SetsData)
            {
                Set set = new Set();
                set.MatchID = SetData["matchid"] != null ? SetData["matchid"].ToString() : string.Empty;
                set.SetNo = SetData["setno"] != null ? Int32.Parse(SetData["setno"].ToString()) : 0;
                set.Player1GamesWon = SetData["player1gameswon"] != null ? Int32.Parse(SetData["player1gameswon"].ToString()) : 0;
                set.Player2GamesWon = SetData["player2gameswon"] != null ? Int32.Parse(SetData["player2gameswon"].ToString()) : 0;
                setsList.Add(set);
            }
            return setsList;
        }

        public static void AddSet(Set set)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return;
            RowSet setData = session.Execute("insert into set (matchid, setno, player1gameswon, player2gameswon)  values (uuid(), '" + set.SetNo + "', '" + set.Player1GamesWon + "', '" + set.Player2GamesWon + "')");
        }
    }
}
