using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisOpenQuizCashing.Hubs
{
    public class QAHub : Hub
    {
        public async Task SendToAll(string user, string message)
        {
            await Clients.All.SendAsync("sendToAll", user, message);
        }

        public async Task SendToAllCorrectAnswer(string correctAnswer)
        {
            await Clients.All.SendAsync("sendToAllCorrectAnswer", correctAnswer);

        }
    }
}
