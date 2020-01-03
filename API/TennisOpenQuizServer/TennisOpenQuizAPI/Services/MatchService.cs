using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cassandra;
using TennisOpenQuizAPI.Models;

namespace TennisOpenQuizAPI.Services
{
    public class MatchService
    {
        public List<Match> GetMatchs()
        {
            ISession session = SessionManager.GetSession();
            List<Match> matchesList = new List<Match>();
            if (session == null)
                return null;
            var matchesData = session.Execute("select * from \"Match\"");
            foreach (var matchData in matchesData)
            {
                Match match = new Match();
                match.MatchID = matchData["MatchID"] != null ? Guid.Parse(matchData["MatchID"].ToString()) : Guid.Empty;
                match.TournamentID = matchData["TournamentID"] != null ? Guid.Parse(matchData["TournamentID"].ToString()) : Guid.Empty;
                match.Player1ID = matchData["Player1ID"] != null ? Guid.Parse(matchData["Player1ID"].ToString()) : Guid.Empty;
                match.Player2ID = matchData["Player2ID"] != null ? Guid.Parse(matchData["Player2ID"].ToString()) : Guid.Empty;
                matchesList.Add(match);
            }
            return matchesList;
        }

        public Match GetMatch(Guid matchID)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return null;
            var matchData = session.Execute("select * from \"Match\" where \"MatchID\"='"+matchID+"'").FirstOrDefault();
            Match match = new Match();
            if (matchData != null)
            {
                match.MatchID = matchData["MatchID"] != null ? Guid.Parse(matchData["MatchID"].ToString()) : Guid.Empty;
                match.TournamentID = matchData["TournamentID"] != null ? Guid.Parse(matchData["TournamentID"].ToString()) : Guid.Empty;
                match.Player1ID = matchData["Player1ID"] != null ? Guid.Parse(matchData["Player1ID"].ToString()) : Guid.Empty;
                match.Player2ID = matchData["Player2ID"] != null ? Guid.Parse(matchData["Player2ID"].ToString()) : Guid.Empty;
            }
            return match;
        }
    }
}
