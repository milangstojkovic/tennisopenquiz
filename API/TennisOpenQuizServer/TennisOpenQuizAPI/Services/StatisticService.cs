using Cassandra;
using System;
using System.Linq;
using TennisOpenQuizAPI.Models;

namespace TennisOpenQuizAPI.Services
{
    public class StatisticService
    {
        public Statistic GetStatistic(string matchID)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return null;
            var statisticData = session.Execute("select * from statistic where matchid = " + matchID + " ALLOW FILTERING").FirstOrDefault();

            Statistic statistic = new Statistic();
            if (statisticData != null)
            {
                statistic.Matchid = statisticData["matchid"].ToString();
                statistic.Player1Aces = statisticData["player1aces"] != null ? Int32.Parse(statisticData["player1aces"].ToString()) : 0;
                statistic.Player2Aces = statisticData["player2aces"] != null ? Int32.Parse(statisticData["player2aces"].ToString()) : 0;
                statistic.Player1DoubleFaults = statisticData["player1doublefaults"] != null ? Int32.Parse(statisticData["player1doublefaults"].ToString()) : 0;
                statistic.Player2DoubleFaults = statisticData["player2doublefaults"] != null ? Int32.Parse(statisticData["player2doublefaults"].ToString()) : 0;
                statistic.Player1UnforcedErrors = statisticData["player1unforcederrors"] != null ? Int32.Parse(statisticData["player1unforcederrors"].ToString()) : 0;
                statistic.Player2UnforcedErrors = statisticData["player2unforcederrors"] != null ? Int32.Parse(statisticData["player2unforcederrors"].ToString()) : 0;
                statistic.Player1TotalPoints = statisticData["player1totalpoints"] != null ? Int32.Parse(statisticData["player1totalpoints"].ToString()) : 0;
                statistic.Player2TotalPoints = statisticData["player2totalpoints"] != null ? Int32.Parse(statisticData["player2totalpoints"].ToString()) : 0;
            }
            return statistic;
        }

        public void AddStatistic(Statistic statistic)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return;
            RowSet statisticData = session.Execute("insert into statistic (matchid, player1aces, player2aces, player1doublefaults, player2doublefaults, player1unforcederrors, player2unforcederrors, player1totalpoints, player2totalpoints)  values ("+statistic.Matchid+", " + statistic.Player1Aces + ", " + statistic.Player2Aces + ", " + statistic.Player1DoubleFaults + ", " + statistic.Player2DoubleFaults + ", " + statistic.Player1UnforcedErrors + ", " + statistic.Player2UnforcedErrors + ", " + statistic.Player1TotalPoints + ", " + statistic.Player2TotalPoints + " )");
        }
    }
}
