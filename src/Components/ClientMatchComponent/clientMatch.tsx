import React, { Component } from "react";
import "./clientMatch.css";
import { Button } from "react-bootstrap";
import { HubConnectionBuilder } from "@aspnet/signalr";
import * as signalR from "@microsoft/signalr";
import { Match } from "../../Models/Model";
import { getMatchByIdService } from "../../CassandraServices/match.service";

const axios = require("axios");
const emptyString = "";
const redisStatisticURL = "https://localhost:44379/api/statistic/";
const redisSetURL = "https://localhost:44379/api/set/";
const redisGameURL = "https://localhost:44379/api/game/";
const redisWinnerURL = "https://localhost:44379/api/winner/";
const redisBreakPtURL = "https://localhost:44379/api/breakpt/";
const hubConnUrl = "https://localhost:44379/qahub";
const redisQuestionURL = "https://localhost:44379/api/question/";
const redisAnswerURL = "https://localhost:44379/api/answer/";
const POST = "POST";

interface Props {
  matchid: string;
  player1:string;
  player2:string;
}
interface IState {
  question: Question;

  player1TotalPoints: number;
  player2TotalPoints: number;
  player1Aces: number;
  player2Aces: number;
  player1DoubleFaults: number;
  player2DoubleFaults: number;
  player1UnforcedErrors: number;
  player2UnforcedErrors: number;

  setNo: number;
  player1GamesWon: number;
  player2GamesWon: number;

  player1Points: number;
  player2Points: number;

  player1BreakPtAtt: number;
  player1BreakPtWon: number;
  player2BreakPtAtt: number;
  player2BreakPtWon: number;

  player1ForehandWinners: number;
  player1BackhandWinners: number;
  player1TotalWinners: number;
  player2ForehandWinners: number;
  player2BackhandWinners: number;
  player2TotalWinners: number;

  /////////////////////////////
  nick: string;
  message: string;
  messages: string[];
  hubConnection: any;
}
class Statistic {
  constructor(
    public matchID: string,
    public player1Aces: number,
    public player2Aces: number,
    public player1DoubleFaults: number,
    public player2DoubleFaults: number,
    public player1UnforcedErrors: number,
    public player2UnforcedErrors: number,
    public player1TotalPoints: number,
    public player2TotalPoints: number
  ) {}
}
class Game {
  constructor(
    public matchID: string,
    public player1Points: number,
    public player2Points: number
  ) {}
}
class Set {
  constructor(
    public matchID: string,
    public setNo: number,
    public player1GamesWon: number,
    public player2GamesWon: number,
    public live: boolean
  ) {}
}
class BreakPt {
  constructor(
    public matchID: string,
    public player1BreakPtAtt: number,
    public player1BreakPtWon: number,
    public player2BreakPtAtt: number,
    public player2BreakPtWon: number
  ) {}
}
class Winner {
  constructor(
    public matchID: string,
    public player1ForehandWinners: number,
    public player1BackhandWinners: number,
    public player1TotalWinners: number,
    public player2ForehandWinners: number,
    public player2BackhandWinners: number,
    public player2TotalWinners: number
  ) {}
}
class Question {
  constructor(
    public questionId: string,
    public questionText: string,
    public answerA: string,
    public answerB: string,
    public answerC: string,
    public answerD: string,
    public points: number,
    public active: boolean
  ) {}
}
class Answer {
  constructor(public answerValue: string, public userAnswered: string) {}
}
class ClientMatch extends Component<Props, IState> {
  match !: Match;
  statistic !: Statistic;
  set !: Set;
  winner !: Winner;
  breakPt !: BreakPt;
  sets !: Set[];
  constructor(props: Props) {
    super(props);
    this.state = {
      question: new Question(
        emptyString,
        emptyString,
        emptyString,
        emptyString,
        emptyString,
        emptyString,
        0,
        false
      ),

      player1TotalPoints: 0,
      player2TotalPoints: 0,
      player1Aces: 0,
      player2Aces: 0,
      player1DoubleFaults: 0,
      player2DoubleFaults: 0,
      player1UnforcedErrors: 0,
      player2UnforcedErrors: 0,

      setNo: 0,
      player1GamesWon: 0,
      player2GamesWon: 0,

      player1Points: 0,
      player2Points: 0,

      player1BreakPtAtt: 0,
      player1BreakPtWon: 0,
      player2BreakPtAtt: 0,
      player2BreakPtWon: 0,

      player1ForehandWinners: 0,
      player1BackhandWinners: 0,
      player1TotalWinners: 0,
      player2ForehandWinners: 0,
      player2BackhandWinners: 0,
      player2TotalWinners: 0,

      nick: emptyString,
      message: emptyString,
      messages: [],
      hubConnection: null
    };
    console.log("uso");
   // this.getData();
  }
  //#region HUB
  componentDidMount = () => {
    console.log("aaa");
    const nick: any = "Nidza";
    const hubConnection: any = new HubConnectionBuilder()
      .withUrl(hubConnUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.setState({ hubConnection, nick }, () => {
      this.state.hubConnection
        .start(() => console.log("started..."))
        .then(() => console.log("Connection started!"))
        .catch((err: any) =>
          console.log("Error while establishing connection :(")
        );

      this.state.hubConnection.on(
        "sendToAll",
        (nick: string, receivedMessage: string) => {
          const text = `${nick}: ${receivedMessage}`;
          const messages = this.state.messages.concat([text]);
          this.setState({ messages });

          this.setState({ message: receivedMessage });

          this.getQuestion();
        }
      );
    });
  };
  sendMessage = () => {
    this.state.hubConnection
      .invoke("sendToAll", this.state.nick, this.state.message)
      .catch((err: any) => console.error(err));

    this.setState({ message: "" });
  };

  async getQuestion(): Promise<Question> {
    let toRet: Question = new Question(
      emptyString,
      emptyString,
      emptyString,
      emptyString,
      emptyString,
      emptyString,
      0,
      false
    );
    await axios
      .get(redisQuestionURL + this.state.message)
      .then((response: { data: Question }) => {
        toRet = response.data;
        this.setState({ question: toRet });
        console.log(this.state.question);
      });
    return toRet;
  }
  //#endregion

  render() {
    return (
      <div className="client-match">
        <div className="question">
          <h2>
            Points: {this.state.question.points}{" "}
            {this.state.question.questionText}
          </h2>
          <Button
            className="btn btn-outline-info"
            value="a"
            onClick={() => this.clickedAnswerA()}
          >
            A) {this.state.question.answerA}{" "}
          </Button>
          <Button
            className="btn btn-outline-info"
            value="b"
            onClick={() => this.clickedAnswerB()}
          >
            B) {this.state.question.answerB}{" "}
          </Button>
          <Button
            className="btn btn-outline-info"
            value="b"
            onClick={() => this.clickedAnswerC()}
          >
            C) {this.state.question.answerC}{" "}
          </Button>
          <Button
            className="btn btn-outline-info"
            value="b"
            onClick={() => this.clickedAnswerD()}
          >
            D) {this.state.question.answerC}{" "}
          </Button>
        </div>
        <div className="players">
          <h2>{this.props.player1}</h2>
          <h2>{this.props.player2}</h2>
        </div>
        <div className="total-points">
          <h4>Total points</h4>
          <div className="totalPoints-data">
            <div className="totalPointsA">
              <div className="totalPointsA-value">
                {this.state.player1TotalPoints}
              </div>
              <div className="totalPointsB">
                <div className="totalPointsB-value">
                  {this.statistic.player2TotalPoints}
                </div>
              </div>
            </div>
          </div>
          <div className="aces-client">
            <h4>Aces</h4>
            <div className="aces-data">
              <div className="acesA">
                <div className="acesA-value">{this.statistic.player1Aces}</div>
              </div>
              <div className="acesB">
                <div className="acesB-value">{this.statistic.player2Aces}</div>
              </div>
            </div>
          </div>
          <div className="doubleFaults-client">
            <h4>Double faults</h4>
            <div className="doubleFaults-data">
              <div className="doubleFaultsA">
                <div className="doubleFaultsA-value">
                  {this.statistic.player1DoubleFaults}
                </div>
              </div>
              <div className="doubleFaultsB">
                <div className="doubleFaultsB-value">
                  {this.statistic.player2DoubleFaults}
                </div>
              </div>
            </div>
          </div>
          <div className="unforcedErrors-client">
            <h4>Unforced errors</h4>
            <div className="unforcedErrors-data">
              <div className="unforcedErrorsA">
                <div className="unforcedErrorsA-value">
                  {this.statistic.player1UnforcedErrors}
                </div>
              </div>
              <div className="unforcedErrorsB">
                <div className="unforcedErrorsB-value">
                  {this.statistic.player2UnforcedErrors}
                </div>
              </div>
            </div>
          </div>
          <div className="breakPointsWon-client">
            <h4>Break points won</h4>
            <div className="breakPointsWon-data">
              <div className="breakPointsWonA">
                <div className="breakPointsWonA-value">
                  {this.breakPt.player1BreakPtWon}
                </div>
              </div>
              <div className="breakPointsWonB">
                <div className="breakPointsWonB-value">
                  {this.breakPt.player2BreakPtWon}
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="forehandWinners-client">
            <h4>Forehand winners</h4>
            <div className="forehandWinners-data">
              <div className="forehandWinnersA">
                <div className="forehandWinnersA-value">
                  {this.winner.player1ForehandWinners}
                </div>
              </div>
              <div className="forehandWinnersB">
                <div className="forehandWinnersB-value">
                  {this.winner.player2ForehandWinners}
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="backhandWinners-client">
            <h4>Backhand winners</h4>
            <div className="backhandWinners-data">
              <div className="backhandWinnersA">
                <div className="backhandWinnersA-value">
                  {this.winner.player1BackhandWinners}
                </div>
              </div>
              <div className="backhandWinnersB">
                <div className="backhandWinnersB-value">
                  {this.winner.player2BackhandWinners}
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="totalWinners-client">
            <h4>Total winners</h4>
            <div className="totalWinners-data">
              <div className="totalWinnersA">
                <div className="totalWinnersA-value">
                  {this.winner.player1TotalWinners}
                </div>
              </div>
              <div className="totalWinnersB">
                <div className="totalWinnersB-value">
                  {this.winner.player2TotalWinners}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button className="btn-refresh" onClick={() => this.clickedButtonRefresh()}>
          {" "}
          REFRESH
        </Button>
        </div>
      )
      }
  async addAnswerToRedis(answerValue: string): Promise<void> {
    let answerToRedis: Answer = new Answer(
      answerValue,
      localStorage.getItem("username") as string
    );
    await fetch(redisAnswerURL, {
      method: POST,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(answerToRedis)
    }).then(response => {
      response.json().then(data => {
        console.log(data);
      });
    });
  }
  clickedAnswerA(): void {
    this.addAnswerToRedis("a");
  }
  clickedAnswerB(): void {
    this.addAnswerToRedis("b");
  }
  clickedAnswerC(): void {
    this.addAnswerToRedis("c");
  }
  clickedAnswerD(): void {
    this.addAnswerToRedis("d");
  }

  async clickedButtonRefresh(): Promise<void> {
    let statistic: Statistic = await this.getStatistic();
    console.log(statistic);
    let set: Set = await this.getSet();
    let winner: Winner = await this.getWinner();
    let breakPt: BreakPt = await this.getBreakPt();
    this.setState({
      player1TotalPoints: statistic.player1TotalPoints,
      player2TotalPoints: statistic.player2TotalPoints,
      player1Aces: statistic.player1Aces,
      player2Aces: statistic.player2Aces,
      player1DoubleFaults: statistic.player1DoubleFaults,
      player2DoubleFaults: statistic.player2DoubleFaults,
      player1UnforcedErrors: statistic.player1UnforcedErrors,
      player2UnforcedErrors: statistic.player2UnforcedErrors,

      setNo: set.setNo,
      player1GamesWon: set.player1GamesWon,
      player2GamesWon: set.player2GamesWon,

      player1BreakPtAtt: breakPt.player1BreakPtAtt,
      player1BreakPtWon: breakPt.player1BreakPtWon,
      player2BreakPtAtt: breakPt.player2BreakPtAtt,
      player2BreakPtWon: breakPt.player2BreakPtWon,

      player1ForehandWinners: winner.player1ForehandWinners,
      player1BackhandWinners: winner.player1BackhandWinners,
      player1TotalWinners:
        winner.player1ForehandWinners + winner.player1BackhandWinners,
      player2ForehandWinners: winner.player2ForehandWinners,
      player2BackhandWinners: winner.player2BackhandWinners,
      player2TotalWinners:
        winner.player2ForehandWinners + winner.player2BackhandWinners
    });
    this.fillStatisticData();
  }
  fillStatisticData(): void {
    let el = document.querySelector(".totalPointsA-value") as HTMLDivElement;

    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.statistic.player1TotalPoints /
      (this.statistic.player1TotalPoints + this.statistic.player2TotalPoints)
    ).toString();

    el = document.querySelector(".totalPointsB-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.statistic.player2TotalPoints /
      (this.statistic.player1TotalPoints + this.statistic.player2TotalPoints)
    ).toString();

    el = document.querySelector(".acesA-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.statistic.player1Aces /
      (this.statistic.player1Aces + this.statistic.player2Aces)
    ).toString();

    el = document.querySelector(".acesB-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.statistic.player2Aces /
      (this.statistic.player1Aces + this.statistic.player2Aces)
    ).toString();

    el = document.querySelector(".doubleFaultsA-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.statistic.player1DoubleFaults /
      (this.statistic.player1DoubleFaults + this.statistic.player2DoubleFaults)
    ).toString();

    el = document.querySelector(".doubleFaultsB-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.statistic.player2DoubleFaults /
      (this.statistic.player1DoubleFaults + this.statistic.player2DoubleFaults)
    ).toString();

    el = document.querySelector(".unforcedErrorsA-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.statistic.player1UnforcedErrors /
      (this.statistic.player1UnforcedErrors + this.statistic.player2UnforcedErrors)
    ).toString();

    el = document.querySelector(".unforcedErrorsB-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.statistic.player2UnforcedErrors /
      (this.statistic.player1UnforcedErrors + this.statistic.player2UnforcedErrors)
    ).toString();
    el = document.querySelector(".breakPointsWonA-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.breakPt.player1BreakPtWon /
      (this.breakPt.player1BreakPtWon + this.breakPt.player2BreakPtWon)
    ).toString();
    el = document.querySelector(".breakPointsWonB-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.breakPt.player2BreakPtWon /
      (this.breakPt.player1BreakPtWon + this.breakPt.player2BreakPtWon)
    ).toString();
    el = document.querySelector(".forehandWinnersA-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.winner.player1ForehandWinners /
      (this.winner.player1ForehandWinners + this.winner.player2ForehandWinners)
    ).toString();
    el = document.querySelector(".forehandWinnersB-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.winner.player2ForehandWinners /
      (this.winner.player1ForehandWinners + this.winner.player2ForehandWinners)
    ).toString();
    el = document.querySelector(".backhandWinnersA-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.winner.player1BackhandWinners /
      (this.winner.player1BackhandWinners + this.winner.player2BackhandWinners)
    ).toString();
    el = document.querySelector(".backhandWinnersB-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.winner.player2BackhandWinners /
      (this.winner.player1BackhandWinners + this.winner.player2BackhandWinners)
    ).toString();
    el = document.querySelector(".totalWinnersA-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.winner.player1TotalWinners /
      (this.winner.player1TotalWinners + this.winner.player2TotalWinners)
    ).toString();
    el = document.querySelector(".totalWinnersB-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.winner.player2TotalWinners /
      (this.winner.player1TotalWinners + this.winner.player2TotalWinners)
    ).toString();
  }
  async getStatistic(): Promise<Statistic> {
    let toRet!: Statistic;
    await axios
      .get(redisStatisticURL + this.props.matchid)
      .then((response: { data: Statistic }) => {
        toRet = response.data;
      });
    return toRet;
  }
  async getWinner(): Promise<Winner> {
    let toRet!: Winner;
    await axios
      .get(redisWinnerURL + this.props.matchid)
      .then((response: { data: Winner }) => {
        toRet = response.data;
      });
    return toRet;
  }
  async getSet(): Promise<Set> {
    let toRet!: Set;
    await axios
      .get(redisSetURL + this.props.matchid)
      .then((response: { data: Set }) => {
        toRet = response.data;
      });
    return toRet;
  }
  async getGame(): Promise<Game> {
    let toRet!: Game;
    await axios
      .get(redisGameURL + this.props.matchid)
      .then((response: { data: Game }) => {
        toRet = response.data;
      });
    return toRet;
  }
  async getBreakPt(): Promise<BreakPt> {
    let toRet!: BreakPt;
    await axios
      .get(redisBreakPtURL + this.props.matchid)
      .then((response: { data: BreakPt }) => {
        toRet = response.data;
      });
    return toRet;
  }

  // async getData(): Promise<void> {
  //   await getMatchByIdService(this.props.matchid).then(m => this.match = m);
  //   if (this.match.isFinished) {
  //     this.setState({ isFinished: true });
  //     await getStatisticByIdService(this.props.matchid).then(s => this.statistic = s);
  //     await getWinnersByIdService(this.props.matchid).then(w=>this.winner=w);
  //     await getBreakPtByIdService(this.props.matchid).then(b=>this.breakPt=b);
      
  //   }
  //   else {
  //     this.statistic = await this.getStatistic();
  //   console.log(this.statistic);
  //   this.set = await this.getSet();
  //   this.winner = await this.getWinner();
  //   this.breakPt = await this.getBreakPt();
  //   }
  //   await this.setState({ loading: true });
  //   this.render();
  // }
}

export default ClientMatch;
