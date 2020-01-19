import React, { Component } from "react";
import "./clientMatch.css";
import { Button } from "react-bootstrap";
import { getStatisticByIdService } from "../../CassandraServices/statistic.service";
const axios = require("axios");

const redisStatisticURL = "https://localhost:44379/api/statistic/";
const redisSetURL = "https://localhost:44379/api/set";
const redisGameURL = "https://localhost:44379/api/game";
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
class ClientMatch extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
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
      player2Points: 0
    };
  }

  render() {
    return (
      <div className="client-match">
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
        <Button className="btn-refresh" onClick={() => this.clickedButton()}>
          {" "}
          REFRESH
        </Button>
      </div>
    );
  }
  async clickedButton(): Promise<void> {
    let statistic: Statistic = await this.getStatistic();
    console.log(statistic);

    this.setState({
      player1TotalPoints: statistic.player1TotalPoints,
      player2TotalPoints: statistic.player2TotalPoints,
      player1Aces: statistic.player1Aces,
      player2Aces: statistic.player2Aces,
      player1DoubleFaults: statistic.player1DoubleFaults,
      player2DoubleFaults: statistic.player1DoubleFaults,
      player1UnforcedErrors: statistic.player1UnforcedErrors,
      player2UnforcedErrors: statistic.player2UnforcedErrors
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
  }
  async getStatistic(): Promise<Statistic> {
    let toRet: Statistic = new Statistic("", 0, 0, 0, 0, 0, 0, 0, 0);
    await axios
      .get(redisStatisticURL + this.props.matchID)
      .then((response: { data: Statistic }) => {
        toRet = response.data;
      });
    return toRet;
  }
}

export default ClientMatch;
