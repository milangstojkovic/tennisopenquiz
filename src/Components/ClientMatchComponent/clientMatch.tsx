import React, { Component } from "react";
import "./clientMatch.css";
import { Button } from "react-bootstrap";
import { getStatisticByIdService } from "../../CassandraServices/statistic.service";
import { getMatchByIdService } from "../../CassandraServices/match.service";
import { Game, Match, Winner, BreakPt, Statistic, Set } from "../../Models/Model";
import { getWinnersByIdService } from "../../CassandraServices/winner.service";
import { getBreakPtByIdService } from "../../CassandraServices/breakPt.service";
const axios = require("axios");

const emptyString = "";
const redisStatisticURL = "https://localhost:44379/api/statistic/";
const redisSetURL = "https://localhost:44379/api/set/";
const redisGameURL = "https://localhost:44379/api/game/";
const redisWinnerURL = "https://localhost:44379/api/winner/";
const redisBreakPtURL = "https://localhost:44379/api/breakpt/";

interface Props {
  matchid: string;
}
interface IState {
  loading: boolean;
  isFinished: boolean;
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
      loading: false,
      isFinished: false
    };
    console.log("uso");
    this.getData();
  }

  render() {
    if (!this.state.loading)
      return null;
    else if (!this.state.isFinished)
      return (
        <div className="client-match">
          <div className="players">
            <h2>{this.match.player1}</h2>
            <h2>{this.match.player2}</h2>
          </div>
          <div className="total-points">
            <h4>Total points</h4>
            <div className="totalPoints-data">
              <div className="totalPointsA">
                <div className="totalPointsA-value">
                  {this.statistic.player1TotalPoints}
                </div>
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
          <Button className="btn-refresh" onClick={() => this.clickedButton()}>
            {" "}
            REFRESH
        </Button>
        </div>
      )
    else
      return (
        <div>

        </div>
      );
  }
  async clickedButton(): Promise<void> {
    this.statistic = await this.getStatistic();
    console.log(this.statistic);
    this.set = await this.getSet();
    this.winner = await this.getWinner();
    this.breakPt = await this.getBreakPt();
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

  async getData(): Promise<void> {
    await getMatchByIdService(this.props.matchid).then(m => this.match = m);
    if (this.match.isFinished) {
      this.setState({ isFinished: true });
      await getStatisticByIdService(this.props.matchid).then(s => this.statistic = s);
      await getWinnersByIdService(this.props.matchid).then(w=>this.winner=w);
      await getBreakPtByIdService(this.props.matchid).then(b=>this.breakPt=b);
      
    }
    else {
      this.statistic = await this.getStatistic();
    console.log(this.statistic);
    this.set = await this.getSet();
    this.winner = await this.getWinner();
    this.breakPt = await this.getBreakPt();
    }
    await this.setState({ loading: true });
    this.render();
  }
}

export default ClientMatch;
