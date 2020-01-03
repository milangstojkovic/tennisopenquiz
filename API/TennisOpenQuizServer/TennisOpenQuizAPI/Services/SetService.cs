using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cassandra;
using TennisOpenQuizAPI.Models;

namespace TennisOpenQuizAPI.Services
{
    public class SetService
    {
        public static List<Set> GetSets(Guid matchID)
        {
            ISession session = SessionManager.GetSession();
            List<Set> setsList = new List<Set>();
            if (session == null)
                return null;
            var SetsData = session.Execute("select * from \"Set\" where \"MatchID\"='"+matchID+"'");
            foreach (var SetData in SetsData)
            {
                Set set = new Set();
                set.MatchID = SetData["MatchID"] != null ? Guid.Parse(SetData["MatchID"].ToString()) : Guid.Empty;
                set.SetNo = SetData["SetNo"] != null ? Int32.Parse(SetData["SetNo"].ToString()) : 0;
                set.Player1GamesWon = SetData["Player1GamesWon"] != null ? Int32.Parse(SetData["Player1GamesWon"].ToString()) : 0;
                set.Player2GamesWon = SetData["Player2GamesWon"] != null ? Int32.Parse(SetData["Player2GamesWon"].ToString()) : 0;
                setsList.Add(set);
            }
            return setsList;
        }

        public void AddSet(Set set)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return;
            RowSet setData = session.Execute("insert into \"Set\" (\"MatchID\", SetNo, Player1GamesWon, Player2GamesWon)  values ('" + set.MatchID + "', '" + set.SetNo + "', '" + set.Player1GamesWon + "', '" + set.Player2GamesWon + "')");
        }
    }
}
