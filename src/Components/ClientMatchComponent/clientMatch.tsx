import React, { Component } from "react";
import "./clientMatch.css";
import { Button } from "react-bootstrap";
import { getStatisticByIdService } from "../../CassandraServices/statistic.service";
const axios = require("axios");

const emptyString = "";
const redisStatisticURL = "https://localhost:44379/api/statistic/";
const redisSetURL = "https://localhost:44379/api/set/";
const redisGameURL = "https://localhost:44379/api/game/";
const redisWinnerURL = "https://localhost:44379/api/winner/";
const redisBreakPtURL = "https://localhost:44379/api/breakpt/";

interface Props {
  matchID: string;
  player1: string;
  player2: string;
}
interface IState {
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

<<<<<<< HEAD

=======
>>>>>>> 2be6fea6525a9747979db7bb6197380403bee5f6
class ClientMatch extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
<<<<<<< HEAD
=======
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
      player2TotalWinners: 0
>>>>>>> 2be6fea6525a9747979db7bb6197380403bee5f6
    };
  }

  render() {
    return (
      <div className="client-match">
<<<<<<< HEAD

        <div className="player1">
=======
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
            </div>
            <div className="totalPointsB">
              <div className="totalPointsB-value">
                {this.state.player2TotalPoints}
              </div>
            </div>
          </div>
        </div>
        <div className="aces-client">
          <h4>Aces</h4>
          <div className="aces-data">
            <div className="acesA">
              <div className="acesA-value">{this.state.player1Aces}</div>
            </div>
            <div className="acesB">
              <div className="acesB-value">{this.state.player2Aces}</div>
            </div>
          </div>
        </div>
        <div className="doubleFaults-client">
          <h4>Double faults</h4>
          <div className="doubleFaults-data">
            <div className="doubleFaultsA">
              <div className="doubleFaultsA-value">
                {this.state.player1DoubleFaults}
              </div>
            </div>
            <div className="doubleFaultsB">
              <div className="doubleFaultsB-value">
                {this.state.player2DoubleFaults}
              </div>
            </div>
          </div>
        </div>
        <div className="unforcedErrors-client">
          <h4>Unforced errors</h4>
          <div className="unforcedErrors-data">
            <div className="unforcedErrorsA">
              <div className="unforcedErrorsA-value">
                {this.state.player1UnforcedErrors}
              </div>
            </div>
            <div className="unforcedErrorsB">
              <div className="unforcedErrorsB-value">
                {this.state.player2UnforcedErrors}
              </div>
            </div>
          </div>
        </div>
        <div className="breakPointsWon-client">
          <h4>Break points won</h4>
          <div className="breakPointsWon-data">
            <div className="breakPointsWonA">
              <div className="breakPointsWonA-value">
                {this.state.player1BreakPtWon}
              </div>
            </div>
            <div className="breakPointsWonB">
              <div className="breakPointsWonB-value">
                {this.state.player2BreakPtWon}
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="forehandWinners-client">
          <h4>Forehand winners</h4>
          <div className="forehandWinners-data">
            <div className="forehandWinnersA">
              <div className="forehandWinnersA-value">
                {this.state.player1ForehandWinners}
              </div>
            </div>
            <div className="forehandWinnersB">
              <div className="forehandWinnersB-value">
                {this.state.player2ForehandWinners}
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="backhandWinners-client">
          <h4>Backhand winners</h4>
          <div className="backhandWinners-data">
            <div className="backhandWinnersA">
              <div className="backhandWinnersA-value">
                {this.state.player1BackhandWinners}
              </div>
            </div>
            <div className="backhandWinnersB">
              <div className="backhandWinnersB-value">
                {this.state.player2BackhandWinners}
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="totalWinners-client">
          <h4>Total winners</h4>
          <div className="totalWinners-data">
            <div className="totalWinnersA">
              <div className="totalWinnersA-value">
                {this.state.player1TotalWinners}
              </div>
            </div>
            <div className="totalWinnersB">
              <div className="totalWinnersB-value">
                {this.state.player2TotalWinners}
              </div>
            </div>
          </div>
>>>>>>> 2be6fea6525a9747979db7bb6197380403bee5f6
        </div>
        <Button className="btn-refresh" onClick={() => this.clickedButton()}>
          {" "}
          REFRESH
        </Button>
      </div>
    );
  }
<<<<<<< HEAD

  async createListener(socket: any) {

  }

=======
  async clickedButton(): Promise<void> {
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

      // player1Points: ,
      // player2Points: 0,

      player1BreakPtAtt: breakPt.player1BreakPtAtt,
      player1BreakPtWon: breakPt.player1BreakPtWon,
      player2BreakPtAtt: breakPt.player2BreakPtAtt,
      player2BreakPtWon: breakPt.player2BreakPtWon,

      player1ForehandWinners: winner.player1ForehandWinners,
      player1BackhandWinners: winner.player1BackhandWinners,
      player1TotalWinners:
        winner.player1ForehandWinners +
        winner.player1BackhandWinners,
      player2ForehandWinners: winner.player2ForehandWinners,
      player2BackhandWinners: winner.player2BackhandWinners,
      player2TotalWinners:
        winner.player2ForehandWinners +
        winner.player2BackhandWinners
    });
    this.fillStatisticData();
  }
  fillStatisticData(): void {
    let el = document.querySelector(".totalPointsA-value") as HTMLDivElement;

    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.state.player1TotalPoints /
      (this.state.player1TotalPoints + this.state.player2TotalPoints)
    ).toString();

    el = document.querySelector(".totalPointsB-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.state.player2TotalPoints /
      (this.state.player1TotalPoints + this.state.player2TotalPoints)
    ).toString();

    el = document.querySelector(".acesA-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.state.player1Aces /
      (this.state.player1Aces + this.state.player2Aces)
    ).toString();

    el = document.querySelector(".acesB-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.state.player2Aces /
      (this.state.player1Aces + this.state.player2Aces)
    ).toString();

    el = document.querySelector(".doubleFaultsA-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.state.player1DoubleFaults /
      (this.state.player1DoubleFaults + this.state.player2DoubleFaults)
    ).toString();

    el = document.querySelector(".doubleFaultsB-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.state.player2DoubleFaults /
      (this.state.player1DoubleFaults + this.state.player2DoubleFaults)
    ).toString();

    el = document.querySelector(".unforcedErrorsA-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.state.player1UnforcedErrors /
      (this.state.player1UnforcedErrors + this.state.player2UnforcedErrors)
    ).toString();

    el = document.querySelector(".unforcedErrorsB-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.state.player2UnforcedErrors /
      (this.state.player1UnforcedErrors + this.state.player2UnforcedErrors)
    ).toString();
    el = document.querySelector(".breakPointsWonA-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.state.player1BreakPtWon /
      (this.state.player1BreakPtWon + this.state.player2BreakPtWon)
    ).toString();
    el = document.querySelector(".breakPointsWonB-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.state.player2BreakPtWon /
      (this.state.player1BreakPtWon + this.state.player2BreakPtWon)
    ).toString();
    el = document.querySelector(".forehandWinnersA-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.state.player1ForehandWinners /
      (this.state.player1ForehandWinners + this.state.player2ForehandWinners)
    ).toString();
    el = document.querySelector(".forehandWinnersB-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.state.player2ForehandWinners /
      (this.state.player1ForehandWinners + this.state.player2ForehandWinners)
    ).toString();
    el = document.querySelector(".backhandWinnersA-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.state.player1BackhandWinners /
      (this.state.player1BackhandWinners + this.state.player2BackhandWinners)
    ).toString();
    el = document.querySelector(".backhandWinnersB-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.state.player2BackhandWinners /
      (this.state.player1BackhandWinners + this.state.player2BackhandWinners)
    ).toString();
    el = document.querySelector(".totalWinnersA-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.state.player1TotalWinners /
      (this.state.player1TotalWinners + this.state.player2TotalWinners)
    ).toString();
    el = document.querySelector(".totalWinnersB-value") as HTMLDivElement;
    el.style.backgroundColor = "green";
    el.style.flexGrow = (
      this.state.player2TotalWinners /
      (this.state.player1TotalWinners + this.state.player2TotalWinners)
    ).toString();
  }
  async getStatistic(): Promise<Statistic> {
    let toRet: Statistic = new Statistic(emptyString, 0, 0, 0, 0, 0, 0, 0, 0);
    await axios
      .get(redisStatisticURL + this.props.matchID)
      .then((response: { data: Statistic }) => {
        toRet = response.data;
      });
    return toRet;
  }
  async getWinner(): Promise<Winner> {
    let toRet: Winner = new Winner(emptyString, 0, 0, 0, 0, 0, 0);
    await axios
      .get(redisWinnerURL + this.props.matchID)
      .then((response: { data: Winner }) => {
        toRet = response.data;
      });
    return toRet;
  }
  async getSet(): Promise<Set> {
    let toRet: Set = new Set(emptyString, 0, 0, 0, false);
    await axios
      .get(redisSetURL + this.props.matchID)
      .then((response: { data: Set }) => {
        toRet = response.data;
      });
    return toRet;
  }
  async getGame(): Promise<Game> {
    let toRet: Game = new Game(emptyString, 0, 0);
    await axios
      .get(redisGameURL + this.props.matchID)
      .then((response: { data: Game }) => {
        toRet = response.data;
      });
    return toRet;
  }
  async getBreakPt(): Promise<BreakPt> {
    let toRet: BreakPt = new BreakPt(emptyString, 0, 0, 0, 0);
    await axios
      .get(redisBreakPtURL + this.props.matchID)
      .then((response: { data: BreakPt }) => {
        toRet = response.data;
      });
    return toRet;
  }
>>>>>>> 2be6fea6525a9747979db7bb6197380403bee5f6
}

export default ClientMatch;
