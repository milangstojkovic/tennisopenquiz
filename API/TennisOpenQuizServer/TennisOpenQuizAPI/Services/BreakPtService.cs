using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cassandra;
using TennisOpenQuizAPI.Models;

namespace TennisOpenQuizAPI.Services
{
    public class BreakPtService
    {
        public static BreakPt GetBreakPt(Guid matchID)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return null;
            var breakPtData = session.Execute("select * from \"BreakPt\" where \"MatchID\" = '" + matchID + "'").FirstOrDefault();
            BreakPt breakPt = new BreakPt();
            if (breakPtData != null)
            {
                breakPt.MatchID = Guid.Parse(breakPtData["MatchID"].ToString());
                breakPt.Player1BreakPtAtt = breakPtData["Player1BreakPtAtt"] != null ? Int32.Parse(breakPtData["Player1BreakPtAtt"].ToString()) : 0;
                breakPt.Player2BreakPtAtt = breakPtData["Player2BreakPtAtt"] != null ? Int32.Parse(breakPtData["Player2BreakPtAtt"].ToString()) : 0;
                breakPt.Player1BreakPtWon = breakPtData["Player1BreakPtWon"] != null ? Int32.Parse(breakPtData["Player1BreakPtWon"].ToString()) : 0;
                breakPt.Player2BreakPtWon = breakPtData["Player2BreakPtWon"] != null ? Int32.Parse(breakPtData["Player2BreakPtWon"].ToString()) : 0;
            }
            return breakPt;
        }

        public void AddBreakPt(BreakPt breakPt)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return;
            RowSet breakPtData = session.Execute("insert into \"BreakPt\" (\"MatchID\", Player1BreakPtAtt, Player1BreakPtWon, Player2BreakPtAtt, Player2BreakPtWon)  values ('" + breakPt.MatchID + "', '" + breakPt.Player1BreakPtAtt + "', '" + breakPt.Player1BreakPtWon + "', '" + breakPt.Player2BreakPtAtt + "', '"+breakPt.Player2BreakPtWon+"')");
        }
    }
}
