using Cassandra;
using System;
using System.Linq;
using TennisOpenQuizAPI.Models;

namespace TennisOpenQuizAPI.Services
{
    public class WinnerService
    {
        public static Winner GetWinner(string matchID)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return null;
            var winnerData = session.Execute("select * from winner where matchid = '" + matchID + "'").FirstOrDefault();
            Winner winner = new Winner();
            if (winnerData != null)
            {
                winner.MatchID = winnerData["matchid"].ToString();
                winner.Player1ForehandWinners = winnerData["player1forehandwinners"] != null ? Int32.Parse(winnerData["player1forehandwinners"].ToString()) : 0;
                winner.Player2ForehandWinners = winnerData["player2forehandwinners"] != null ? Int32.Parse(winnerData["player2forehandwinners"].ToString()) : 0;
                winner.Player1BackhandWinners = winnerData["player1backhandwinners"] != null ? Int32.Parse(winnerData["player1backhandwinners"].ToString()) : 0;
                winner.Player2BackhandWinners = winnerData["player2backhandwinners"] != null ? Int32.Parse(winnerData["player2backhandwinners"].ToString()) : 0;
                winner.Player1TotalWinners = winnerData["player1totalwinners"] != null ? Int32.Parse(winnerData["player1totalwinners"].ToString()) : 0;
                winner.Player2TotalWinners = winnerData["player2totalwinners"] != null ? Int32.Parse(winnerData["player2totalwinners"].ToString()) : 0;
            }
            return winner;
        }

        public static void AddWinner(Winner winner)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return;
            RowSet winnerData = session.Execute("insert into winner (matchID, player1forehandwinners, player1backhandwinners, player1totalwinners, player2forehandwinners, player2backhandwinners, player2totalwinners)  values ('" + winner.MatchID + "', '" + winner.Player1ForehandWinners + "', '" + winner.Player1BackhandWinners + "', '" + winner.Player1TotalWinners + "', '" + winner.Player2ForehandWinners + "', '" + winner.Player2BackhandWinners + "', '" + winner.Player2TotalWinners + "')");
        }
    }
}
