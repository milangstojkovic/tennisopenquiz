﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cassandra;
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
            var tournamentsData = session.Execute("select * from \"Tournament\"");
            foreach (var tournamentData in tournamentsData)
            {
                Tournament tournament = new Tournament();
                tournament.TournamentID = tournamentData["TournamentID"] != null ? (Guid)tournamentData["TournamentID"] : Guid.Empty;
                tournament.Name = tournamentData["Name"] != null ? tournamentData["Name"].ToString() : string.Empty;
                tournament.Date = tournamentData["Date"] != null ? DateTime.Parse(tournamentData["Date"].ToString()) : DateTime.MinValue;
                tournament.Surface = tournamentData["Surface"] != null ? tournamentData["Surface"].ToString() : string.Empty;
                tournamentsList.Add(tournament);
            }
            return tournamentsList;
        }

        public Tournament GetTournament(Guid tournamentID)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return null;
            var TournamentData = session.Execute("select * from \"Tournament\" where \"TournamentID\"='" + tournamentID + "'").FirstOrDefault();
            Tournament tour = new Tournament();
            if(TournamentData!= null)
            {
                tour.TournamentID = TournamentData["TournamentID"] != null ? (Guid)TournamentData["TournamentID"] : Guid.Empty;
                tour.Name = TournamentData["Name"] != null ? TournamentData["Name"].ToString() : string.Empty;
                tour.Date = TournamentData["Date"] != null ? DateTime.Parse(TournamentData["TournamentID"].ToString()) : DateTime.MinValue;
                tour.Surface = TournamentData["Surface"] != null ? TournamentData["Surface"].ToString() : string.Empty;
            }
            return tour;
        }

        public void AddTournament(Tournament tour)
        {
            ISession session = SessionManager.GetSession();
            if (session == null)
                return;
            RowSet tourData = session.Execute("insert into \"Tournament\" (\"TournamentID\", Name, Date, Surface)  values ('" + tour.TournamentID + "', '" + tour.Name + "', '" + tour.Date + "', '" + tour.Surface + "')");
        }
    }
}
