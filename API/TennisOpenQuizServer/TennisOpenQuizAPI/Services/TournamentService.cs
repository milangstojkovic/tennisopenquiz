using Cassandra;
using System;
using System.Collections.Generic;
using System.Linq;
using TennisOpenQuizAPI.Models;

namespace TennisOpenQuizAPI.Services
{
    public class TournamentService
    {
        public List<Tournament> GetTournaments()
        {
            ISession session = SessionManager.GetSession();
            List<Tournament> tournamentsList = new List<Tournament>();
            if (session == null)
                return null;
            var tournamentsData = session.Execute("select * from tournament");
            foreach (var tournamentData in tournamentsData)
            {
                Tournament tournament = new Tournament();
                tournament.TournamentID = tournamentData["tournamentid"] != null ? tournamentData["tournamentid"].ToString() : String.Empty;
                tournament.Name = tournamentData["name"] != null ? tournamentData["name"].ToString() : string.Empty;
                tournament.Date = tournamentData["date"] != null ? DateTime.Parse(tournamentData["date"].ToString()) : DateTime.MinValue;
                tournament.Surface = tournamentData["surface"] != null ? tournamentData["surface"].ToString() : string.Empty;
                tournamentsList.Add(tournament);
            }
            return tournamentsList;
        }

        public Tournament GetTournament(string tournamentID)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return null;
            var TournamentData = session.Execute("select * from tournament where tournamentid='" + tournamentID + "' ALLOW FILTERING").FirstOrDefault();
            Tournament tour = new Tournament();
            if (TournamentData != null)
            {
                tour.TournamentID = TournamentData["tournamentid"] != null ? TournamentData["tournamentid"].ToString() : String.Empty;
                tour.Name = TournamentData["name"] != null ? TournamentData["name"].ToString() : string.Empty;
                tour.Date = TournamentData["date"] != null ? DateTime.Parse(TournamentData["date"].ToString()) : DateTime.MinValue;
                tour.Surface = TournamentData["surface"] != null ? TournamentData["surface"].ToString() : string.Empty;
            }
            return tour;
        }

        public void AddTournament(Tournament tour)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return;
            RowSet tourData = session.Execute("insert into tournament (tournamentid, name, date, surface)  values (uuid(), '" + tour.Name + "', '" + tour.Date + "', '" + tour.Surface + "')");
        }
    }
}
