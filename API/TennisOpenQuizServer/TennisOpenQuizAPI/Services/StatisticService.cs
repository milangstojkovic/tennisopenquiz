using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cassandra;
using TennisOpenQuizAPI.Models;

namespace TennisOpenQuizAPI.Services
{
    public class StatisticService
    {
        public Statistic GetStatistic(Guid matchID)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return null;
            var statisticData = session.Execute("select * from \"Statistic\" where \"MatchID\" = '" + matchID + "'").FirstOrDefault();
           
            Statistic statistic = new Statistic();
            if (statisticData != null)
            {
                statistic.MatchID = Guid.Parse(statisticData["MatchID"].ToString());
                statistic.Player1Aces = statisticData["Player1Aces"] != null ? Int32.Parse(statisticData["Player1Aces"].ToString()) : 0;
                statistic.Player2Aces = statisticData["Player2Aces"] != null ? Int32.Parse(statisticData["Player2Aces"].ToString()) : 0;
                statistic.Player1DoubleFaults = statisticData["Player1DoubleFaults"] != null ? Int32.Parse(statisticData["Player1DoubleFaults"].ToString()) : 0;
                statistic.Player2DoubleFaults = statisticData["Player2DoubleFaults"] != null ? Int32.Parse(statisticData["Player2DoubleFaults"].ToString()) : 0;
                statistic.Player1UnforcedErrors = statisticData["Player1UnforcerErrors"] != null ? Int32.Parse(statisticData["Player1UnforcedErrors"].ToString()) : 0;
                statistic.Player2UnforcedErrors = statisticData["Player2UnforcedErrors"] != null ? Int32.Parse(statisticData["Player2UnforcedErrors"].ToString()) : 0;
                statistic.Winners = WinnerService.GetWinner(matchID);
                statistic.BreakPts = BreakPtService.GetBreakPt(matchID);
                statistic.Player1TotalPoints = statisticData["Player1TotalPoints"] != null ? Int32.Parse(statisticData["Player1TotalPoints"].ToString()) : 0;
                statistic.Player2TotalPoints = statisticData["Player2TotalPoints"] != null ? Int32.Parse(statisticData["Player2TotalPoints"].ToString()) : 0;
                statistic.Result = SetService.GetSets(matchID);
            }
            return statistic;
        }

        public void AddStatistic(Statistic statistic)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return;
            RowSet statisticData = session.Execute("insert into \"Statistic\" (\"MatchID\", Player1Aces, Player2Aces, Player1DoubleFaults, Player2DoubleFaults, Player1UnforcedErrors, Player2UnforcedErrors, Player1TotalPoints, Player2TotalPoints)  values ('" + statistic.MatchID + "', '" + statistic.Player1Aces + "', '" + statistic.Player2Aces + "', '" + statistic.Player1DoubleFaults + "', '" + statistic.Player2DoubleFaults + "', '" + statistic.Player1UnforcedErrors + "', '" + statistic.Player2UnforcedErrors + "', '" + statistic.Player1TotalPoints + "', '" + statistic.Player2TotalPoints + "' )");
            WinnerService.AddWinners(statistic.MatchID);
            BreakPtService.AddBreakPt(statistic.MatchID);
        }
    }
}
