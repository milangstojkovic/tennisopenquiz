using Cassandra;
using System;
using System.Collections.Generic;
using System.Linq;
using TennisOpenQuizAPI.Models;

namespace TennisOpenQuizAPI.Services
{
    public class MatchService
    {
        public List<Match> GetMatches()
        {
            ISession session = SessionManager.GetSession();
            List<Match> matchesList = new List<Match>();
            if (session == null)
                return null;
            var matchesData = session.Execute("select * from \"Match\"");
            foreach (var matchData in matchesData)
            {
                Match match = new Match();
                match.MatchID = matchData["matchid"] != null ? matchData["matchid"].ToString() : string.Empty;
                match.TournamentID = matchData["tournamentid"] != null ? matchData["tournamentid"].ToString() : string.Empty;
                match.Player1ID = matchData["player1id"] != null ? matchData["player1id"].ToString() : string.Empty;
                match.Player2ID = matchData["player2id"] != null ? matchData["player2id"].ToString() : string.Empty;
                match.Date = matchData["date"] != null ? DateTime.Parse(matchData["date"].ToString()) : DateTime.MinValue;
                matchesList.Add(match);
            }
            return matchesList;
        }

        public Match GetMatch(string matchID)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return null;
            var matchData = session.Execute("select * from match where matchid='" + matchID + "'").FirstOrDefault();
            Match match = new Match();
            if (matchData != null)
            {
                match.MatchID = matchData["matchid"] != null ? matchData["matchid"].ToString() : string.Empty;
                match.TournamentID = matchData["tournamentid"] != null ? matchData["tournamentid"].ToString() : string.Empty;
                match.Player1ID = matchData["player1id"] != null ? matchData["player1id"].ToString() : string.Empty;
                match.Player2ID = matchData["player2id"] != null ? matchData["player2id"].ToString() : string.Empty;
                match.Date = matchData["date"] != null ? DateTime.Parse(matchData["date"].ToString()) : DateTime.MinValue;
            }
            return match;
        }

        public void AddMatch(Match match)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return;
            RowSet matchData = session.Execute("insert into match (matchid, tournamentid, player1id, player2id, date)  values ('" + match.MatchID + "', '" + match.TournamentID + "', '" + match.Player1ID + "', '" + match.Player2ID + "', '" + match.Date + "')");
        }
    }
}
