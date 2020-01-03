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
        public static Statistic GetStatistic(string statisticID)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return null;
            var statisticData = session.Execute("select * from \"Statistic\" where \"StatisticID\" = '" + statisticID + "'").FirstOrDefault();
            Statistic statistic = new Statistic();
            if (statisticData != null)
            {
                statistic.StatisticID = statisticData["StatisticID"] != null ? statisticData["StatisticID"].ToString() : string.Empty;
                statistic.Player1Aces = statisticData["Player1Aces"] != null ? Int32.Parse(statisticData["Player1Aces"].ToString()) : 0;
                statistic.Player2Aces = statisticData["Player2Aces"] != null ? Int32.Parse(statisticData["Player2Aces"].ToString()) : 0;
                statistic.Player1DoubleFaults = statisticData["Player1DoubleFaults"] != null ? Int32.Parse(statisticData["Player1DoubleFaults"].ToString()) : 0;
                statistic.Player2DoubleFaults = statisticData["Player2DoubleFaults"] != null ? Int32.Parse(statisticData["Player2DoubleFaults"].ToString()) : 0;
            }
            return statistic;
        }
    }
}
