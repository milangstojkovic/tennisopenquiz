using Cassandra;
using System;
using System.Linq;
using TennisOpenQuizAPI.Models;

namespace TennisOpenQuizAPI.Services
{
    public class BreakPtService
    {
        public BreakPt GetBreakPt(string matchID)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return null;
            var breakPtData = session.Execute("select * from breakpt where matchid = '" + matchID + "' ALLOW FILTERING").FirstOrDefault();
            BreakPt breakPt = new BreakPt();
            if (breakPtData != null)
            {
                breakPt.MatchID = breakPtData["matchid"].ToString();
                breakPt.Player1BreakPtAtt = breakPtData["player1breakptatt"] != null ? Int32.Parse(breakPtData["player1breakptatt"].ToString()) : 0;
                breakPt.Player2BreakPtAtt = breakPtData["player2breakptatt"] != null ? Int32.Parse(breakPtData["player2breakptatt"].ToString()) : 0;
                breakPt.Player1BreakPtWon = breakPtData["player1breakptwon"] != null ? Int32.Parse(breakPtData["player1breakptwon"].ToString()) : 0;
                breakPt.Player2BreakPtWon = breakPtData["player2breakptwon"] != null ? Int32.Parse(breakPtData["player2breakptwon"].ToString()) : 0;
            }
            return breakPt;
        }

        public void AddBreakPt(BreakPt breakPt)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return;
            RowSet breakPtData = session.Execute("insert into breakpt (matchid, player1breakptatt, player1breakptwon, player2breakptatt, player2breakptwon)  values (uuid(), '" + breakPt.Player1BreakPtAtt + "', '" + breakPt.Player1BreakPtWon + "', '" + breakPt.Player2BreakPtAtt + "', '" + breakPt.Player2BreakPtWon + "')");
        }
    }
}
