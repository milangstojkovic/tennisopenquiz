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
            var matchesData = session.Execute("select * from match");
            foreach (var matchData in matchesData)
            {
                Match match = new Match();
                match.Matchid = matchData["matchid"] != null ? matchData["matchid"].ToString() : string.Empty;
                match.TournamentName = matchData["tournamentname"] != null ? matchData["tournamentname"].ToString() : string.Empty;
                match.Player1 = matchData["player1"] != null ? matchData["player1"].ToString() : string.Empty;
                match.Player2 = matchData["player2"] != null ? matchData["player2"].ToString() : string.Empty;
                match.Date = matchData["date"] != null ? matchData["date"].ToString() : string.Empty;
                match.IsFinished = matchData["isfinished"] != null ? (bool)matchData["isfinished"] : false;
                matchesList.Add(match);
            }
            return matchesList;
        }

        public Match GetMatch(string matchID)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return null;
            var matchData = session.Execute("select * from match where matchid=" + matchID + " ALLOW FILTERING").FirstOrDefault();
            Match match = new Match();
            if (matchData != null)
            {
                match.Matchid = matchData["matchid"] != null ? matchData["matchid"].ToString() : string.Empty;
                match.TournamentName = matchData["tournamentname"] != null ? matchData["tournamentname"].ToString() : string.Empty;
                match.Player1 = matchData["player1"] != null ? matchData["player1"].ToString() : string.Empty;
                match.Player2 = matchData["player2"] != null ? matchData["player2"].ToString() : string.Empty;
                match.Date = matchData["date"] != null ? matchData["date"].ToString() : string.Empty;
                match.IsFinished = matchData["isfinished"] != null ? (bool)matchData["isfinished"] : false;
            }
            return match;
        }

        public void AddMatch(Match match)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return;
            RowSet matchData = session.Execute("insert into match (matchid, tournamentname, player1, player2, date, isfinished)  values (uuid(), '" + match.TournamentName + "', '" + match.Player1 + "', '" + match.Player2 + "', '" + match.Date + "', false)");
        }

        public void UpdateMatchScore(Match match)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return;
            RowSet matchData = session.Execute("Update match set isfinished = true Where matchid = " + match.Matchid + ";");
        }
    }
}
