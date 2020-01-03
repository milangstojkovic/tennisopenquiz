using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cassandra;
using TennisOpenQuizAPI.Models;

namespace TennisOpenQuizAPI.Services
{
    public class WinnerService
    {
        public static Winner GetWinner(Guid matchID)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return null;
            var winnerData = session.Execute("select * from \"Winner\" where \"MatchID\" = '" + matchID + "'").FirstOrDefault();
            Winner winner = new Winner();
            if (winnerData != null)
            {
                winner.MatchID = Guid.Parse(winnerData["MatchID"].ToString());
                winner.Player1ForehandWinners = winnerData["Player1ForehandWinners"] != null ? Int32.Parse(winnerData["Player1ForehandWinners"].ToString()) : 0;
                winner.Player2ForehandWinners = winnerData["Player2ForehandWinners"] != null ? Int32.Parse(winnerData["Player2ForehandWinners"].ToString()) : 0;
                winner.Player1BackhandWinners = winnerData["Player1BackhandWinners"] != null ? Int32.Parse(winnerData["Player1BackhandWinners"].ToString()) : 0;
                winner.Player2BackhandWinners = winnerData["Player2BackhandWinners"] != null ? Int32.Parse(winnerData["Player2BackhandWinners"].ToString()) : 0;
                winner.Player1TotalWinners = winnerData["Player1TotalWinners"] != null ? Int32.Parse(winnerData["Player1TotalWinners"].ToString()) : 0;
                winner.Player2TotalWinners = winnerData["Player2TotalWinners"] != null ? Int32.Parse(winnerData["Player2TotalWinners"].ToString()) : 0;
            }
            return winner;
        }

        public static void AddWinner(Winner winner)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return;
            RowSet winnerData = session.Execute("insert into \"Winner\" (\"MatchID\", Player1ForehandWinners, Player1BackhandWinners, Player1TotalWinners, Player2ForehandWinners, Player2BackhandWinners, Player2TotalWinners)  values ('" + winner.MatchID + "', '" + winner.Player1ForehandWinners + "', '" + winner.Player1BackhandWinners + "', '" + winner.Player1TotalWinners + "', '" + winner.Player2ForehandWinners + "', '"+winner.Player2BackhandWinners+"', '"+winner.Player2TotalWinners+"')");
        }
    }
}
