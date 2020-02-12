import React, { Component } from "react";
import "./adminStatistic.css";
import { Button } from "react-bootstrap";
import Questions from "../QuestionsComponent/questions";
import { createStatisticService } from "../../CassandraServices/statistic.service";
const emptyString = "";
const False = false;
const POST = "POST";
const GET = "GET";
const PUT = "PUT";
const redisStatisticURL = "https://localhost:44379/api/statistic";
const redisSetURL = "https://localhost:44379/api/set";
const redisGameURL = "https://localhost:44379/api/game";
const redisWinnerURL = "https://localhost:44379/api/winner";
const redisBreakPtURL = "https://localhost:44379/api/breakpt";

interface Props {
  matchid: string;
}

interface IState {
  acesA: number;
  acesB: number;

  doubleFaultsA: number;
  doubleFaultsB: number;

  totalPointsA: number;
  totalPointsB: number;

  gameA: number;
  gameB: number;

  setA: number;
  setB: number;

  breakPointsAWon: number;
  breakPointsBWon: number;

  breakPointsAAtt: number;
  breakPointsBAtt: number;

  pointsInGameA: number;
  pointsInGameB: number;

  unforcedErrorsA: number;
  unforcedErrorsB: number;

  forehandWinnersA: number;
  forehandWinnersB: number;
  backhandWinnersA: number;
  backhandWinnersB: number;
  totalWinnersA: number;
  totalWinnersB: number;
}
class Statistic {
  constructor(
    public matchid: string,
    public Player1Aces: number,
    public Player2Aces: number,
    public Player1DoubleFaults: number,
    public Player2DoubleFaults: number,
    public Player1UnforcedErrors: number,
    public Player2UnforcedErrors: number,
    public Player1TotalPoints: number,
    public Player2TotalPoints: number
  ) {}
}
class Game {
  constructor(
    public matchid: string,
    public player1Points: number,
    public player2Points: number
  ) {}
}
class Set {
  constructor(
    public matchid: string,
    public setNo: number,
    public player1GamesWon: number,
    public player2GamesWon: number,
    public live: boolean
  ) {}
}
class BreakPt {
  constructor(
    public matchid: string,
    public player1BreakPtAtt: number,
    public player1BreakPtWon: number,
    public player2BreakPtAtt: number,
    public player2BreakPtWon: number
  ) {}
}
class Winner {
  constructor(
    public matchid: string,
    public player1ForehandWinners: number,
    public player1BackhandWinners: number,
    public player1TotalWinners: number,
    public player2ForehandWinners: number,
    public player2BackhandWinners: number,
    public player2TotalWinners: number
  ) {}
}
class AdminStatistic extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      acesA: 0,
      acesB: 0,
      doubleFaultsA: 0,
      doubleFaultsB: 0,

      totalPointsA: 0,
      totalPointsB: 0,

      gameA: 0,
      gameB: 0,

      setA: 0,
      setB: 0,

      breakPointsAAtt: 0,
      breakPointsAWon: 0,

      breakPointsBAtt: 0,
      breakPointsBWon: 0,

      pointsInGameA: 0,
      pointsInGameB: 0,

      unforcedErrorsA: 0,
      unforcedErrorsB: 0,

      forehandWinnersA: 0,
      forehandWinnersB: 0,
      backhandWinnersB: 0,
      backhandWinnersA: 0,
      totalWinnersA: 0,
      totalWinnersB: 0
    };
  }
  render() {
    return (
      <div className="admin-statistic">
        <div className="row">
          <div className="col">
        <Questions/>
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
            <h1>PLAYER A</h1>
        <table className="playerA-statistic">
          
          <tbody>
          <tr>
            <td className="label">Aces: {this.state.acesA}</td>
            <td>  <Button onClick={() => this.acesAButtonPlusClicked()}>+</Button></td>
             <td> <Button className="button-minus" onClick={() => this.acesAButtonMinusClicked()}>-</Button></td>
          </tr>
          <tr>
            <td className="label"> Double faults: {this.state.doubleFaultsA} </td>
             <td> <Button onClick={() => this.doubleFaultsAPlusClicked()}>+</Button></td>
           <td>   <Button className="button-minus" onClick={() => this.doubleFaultsAMinusClicked()}>-</Button></td>
          </tr>
          <tr className="unforcedErrors">
            <td className="label">Unforced errors: {this.state.unforcedErrorsA}</td>
            <td> <Button onClick={() => this.unforcedErrorsAPlusClicked()}>+</Button></td>
             <td> <Button className="button-minus" onClick={() => this.unforcedErrorsAMinusClicked()}>-</Button> </td>
          </tr>
          <tr className="totalPoints">
            <td className="label">Total points: {this.state.totalPointsA}</td>
             <td> <Button onClick={() => this.totalPointsAPlusClicked()}>+</Button></td>
              <td><Button className="button-minus" onClick={() => this.totalPointsAMinusClicked()}>-</Button></td>
          </tr>
          <tr className="set">
            <td className="label">Sets: {this.state.setA}</td>
             <td> <Button onClick={() => this.setAPlusClicked()}>+</Button></td>
              <td><Button className="button-minus" onClick={() => this.setAMinusClicked()}>-</Button></td>
          </tr>
          <tr className="games">
            <td className="label">Games: {this.state.gameA}</td>
            <td>  <Button onClick={() => this.gamesAPlusClicked()}>+</Button></td>
             <td><Button className="button-minus" onClick={() => this.gamesAMinusClicked()}>-</Button></td>
          </tr>
          <tr className="points">
            <td className="label">Points: {this.state.pointsInGameA}</td>
             <td><Button onClick={() => this.pointsAPlusClicked()}>+</Button></td> 
             <td> <Button className="button-minus" onClick={() => this.pointsAMinutClicked()}>-</Button></td>
          </tr>
          <tr className="breakPoints">
            <td className="label">Break points att: {this.state.breakPointsAAtt}</td>
             <td> <Button onClick={() => this.breakPointsAAttPlusClicked()}>+</Button></td>
              <td><Button className="button-minus" onClick={() => this.breakPointsAAttMinusClicked()}>-</Button></td>
          </tr>
          <tr className="breakPoints">
            <td className="label">Break points won: {this.state.breakPointsAWon}</td>
             <td> <Button onClick={() => this.breakPointsAWonPlusClicked()}>+</Button></td>
             <td><Button className="button-minus" onClick={() => this.breakPointsAWonMinusClicked()}>-</Button></td>
          </tr>
          <tr className="winners">
            <td className="label">Forehand winners: {this.state.forehandWinnersA}</td>
             <td> <Button onClick={() => this.forehandWinnersAPlusClicked()}>+</Button></td>
             <td> <Button className="button-minus" onClick={() => this.forehandWinnersAMinusClicked()}>-</Button></td>
          </tr>
          <tr className="winners">
            <td className="label">Backhand winners: {this.state.backhandWinnersA}</td>
             <td> <Button onClick={() => this.backhandWinnersAPlusClicked()}>+</Button></td>
              <td><Button className="button-minus" onClick={() => this.backhandWinnersAMinusClicked()}>-</Button></td>
          </tr>
          </tbody>
        </table>
        </div>
        <div className="col"> 
        <h1>PLAYER B</h1>
        <table className="playerB-statistic">   
          <tbody>
          <tr>
            <td className="label">Aces: {this.state.acesB}</td>
            <td>  <Button onClick={() => this.acesBButtonPlusClicked()}>+</Button></td>
             <td> <Button className="button-minus" onClick={() => this.acesAButtonMinusClicked()}>-</Button></td>
          </tr>
          <tr>
            <td className="label"> Double faults: {this.state.doubleFaultsB} </td>
             <td> <Button onClick={() => this.doubleFaultsBPlusClicked()}>+</Button></td>
           <td>   <Button className="button-minus" onClick={() => this.doubleFaultsAMinusClicked()}>-</Button></td>
          </tr>
          <tr className="unforcedErrors">
            <td className="label">Unforced errors: {this.state.unforcedErrorsB}</td>
            <td> <Button onClick={() => this.unforcedErrorsBPlusClicked()}>+</Button></td>
             <td> <Button className="button-minus" onClick={() => this.unforcedErrorsBMinusClicked()}>-</Button> </td>
          </tr>
          <tr className="totalPoints">
            <td className="label">Total points: {this.state.totalPointsB}</td>
             <td> <Button onClick={() => this.totalPointsBPlusClicked()}>+</Button></td>
              <td><Button className="button-minus" onClick={() => this.totalPointsBMinusClicked()}>-</Button></td>
          </tr>
          <tr className="set">
            <td className="label">Sets: {this.state.setB}</td>
             <td> <Button onClick={() => this.setBPlusClicked()}>+</Button></td>
              <td><Button className="button-minus" onClick={() => this.setBMinusClicked()}>-</Button></td>
          </tr>
          <tr className="games">
            <td className="label">Games: {this.state.gameB}</td>
            <td>  <Button onClick={() => this.gamesBPlusClicked()}>+</Button></td>
             <td><Button className="button-minus" onClick={() => this.gamesBMinusClicked()}>-</Button></td>
          </tr>
          <tr className="points">
            <td className="label">Points: {this.state.pointsInGameB}</td>
             <td><Button onClick={() => this.pointsBPlusClicked()}>+</Button></td> 
             <td> <Button className="button-minus" onClick={() => this.pointsBMinutClicked()}>-</Button></td>
          </tr>
          <tr className="breakPoints">
            <td className="label">Break points att: {this.state.breakPointsBAtt}</td>
             <td> <Button onClick={() => this.breakPointsBAttPlusClicked()}>+</Button></td>
              <td><Button className="button-minus" onClick={() => this.breakPointsBAttMinusClicked()}>-</Button></td>
          </tr>
          <tr className="breakPoints">
            <td className="label">Break points won: {this.state.breakPointsBWon}</td>
             <td> <Button onClick={() => this.breakPointsBWonPlusClicked()}>+</Button></td>
             <td><Button className="button-minus" onClick={() => this.breakPointsBWonMinusClicked()}>-</Button></td>
          </tr>
          <tr className="winners">
            <td className="label">Forehand winners: {this.state.forehandWinnersB}</td>
             <td> <Button onClick={() => this.forehandWinnersBPlusClicked()}>+</Button></td>
             <td> <Button className="button-minus" onClick={() => this.forehandWinnersBMinusClicked()}>-</Button></td>
          </tr>
          <tr className="winners">
            <td className="label">Backhand winners: {this.state.backhandWinnersB}</td>
             <td> <Button onClick={() => this.backhandWinnersBPlusClicked()}>+</Button></td>
              <td><Button className="button-minus" onClick={() => this.backhandWinnersBMinusClicked()}>-</Button></td>
          </tr>
          </tbody>
        </table>
        </div>
        </div>
        <table>
          <tbody>
            <tr>
        <td><Button id="addRedis" onClick={() => this.AddStatistic()}> ADD REDIS</Button></td>
        <td><Button id="finish" onClick={() => this.finishMatch()}> Finish match</Button></td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        </div>
    );
  }

  //#region PLAYERA
  gamesAPlusClicked(): void {
    let gamePlus = this.state.gameA + 1;
    this.setState({ gameA: gamePlus });
  }
  backhandWinnersAMinusClicked(): void {
    let backhandWinnersAWonMinusOne = this.state.backhandWinnersA - 1;
    this.setState({ backhandWinnersA: backhandWinnersAWonMinusOne });
  }
  backhandWinnersAPlusClicked(): void {
    let backhandWinnersPlusOne = this.state.backhandWinnersA + 1;
    this.setState({ backhandWinnersA: backhandWinnersPlusOne });
  }
  forehandWinnersAMinusClicked(): void {
    let forehandWinnersMinusOne = this.state.forehandWinnersA - 1;
    this.setState({ forehandWinnersA: forehandWinnersMinusOne });
  }
  forehandWinnersAPlusClicked(): void {
    let forehandWinnersPlusOne = this.state.forehandWinnersA + 1;
    this.setState({ forehandWinnersA: forehandWinnersPlusOne });
  }
  breakPointsAWonMinusClicked(): void {
    let breakPointsAWonMinusOne = this.state.breakPointsAWon - 1;
    this.setState({ breakPointsAWon: breakPointsAWonMinusOne });
  }
  breakPointsAWonPlusClicked(): void {
    let breakPointsAWonPlusOne = this.state.breakPointsAWon + 1;
    this.setState({ breakPointsAWon: breakPointsAWonPlusOne });
  }
  breakPointsAAttMinusClicked(): void {
    let breakPointsAAttMinusOne = this.state.breakPointsAAtt - 1;
    this.setState({ breakPointsAAtt: breakPointsAAttMinusOne });
  }
  breakPointsAAttPlusClicked(): void {
    let breakPointsAAttPlusOne = this.state.breakPointsAAtt + 1;
    this.setState({ breakPointsAAtt: breakPointsAAttPlusOne });
  }
  pointsAMinutClicked(): void {
    let breakPointsAMinusOne = this.state.pointsInGameA - 1;
    this.setState({ pointsInGameA: breakPointsAMinusOne });
  }
  pointsAPlusClicked(): void {
    let breakPointsAPlusOne = this.state.pointsInGameA + 1;
    this.setState({ pointsInGameA: breakPointsAPlusOne });
  }
  gamesAMinusClicked(): void {
    let breakPointsAMinusOne = this.state.gameA - 1;
    this.setState({ gameA: breakPointsAMinusOne });
  }
  setAMinusClicked(): void {
    let breakPointsAMinusOne = this.state.setA - 1;
    this.setState({ setA: breakPointsAMinusOne });
  }
  setAPlusClicked(): void {
    let breakPointsAPlusOne = this.state.setA + 1;
    this.setState({ setA: breakPointsAPlusOne });
  }
  totalPointsAMinusClicked(): void {
    let breakPointsAMinusOne = this.state.totalPointsA - 1;
    this.setState({ totalPointsA: breakPointsAMinusOne });
  }
  totalPointsAPlusClicked(): void {
    let breakPointsAPlusOne = this.state.totalPointsA + 1;
    this.setState({ totalPointsA: breakPointsAPlusOne });
  }
  unforcedErrorsAMinusClicked(): void {
    let breakPointsAMinusOne = this.state.unforcedErrorsA - 1;
    this.setState({ unforcedErrorsA: breakPointsAMinusOne });
  }
  unforcedErrorsAPlusClicked(): void {
    let breakPointsAPlusOne = this.state.unforcedErrorsA + 1;
    this.setState({ unforcedErrorsA: breakPointsAPlusOne });
  }
  doubleFaultsAMinusClicked(): void {
    let breakPointsAMinusOne = this.state.doubleFaultsA - 1;
    this.setState({ doubleFaultsA: breakPointsAMinusOne });
  }
  doubleFaultsAPlusClicked(): void {
    let breakPointsAPlusOne = this.state.doubleFaultsA + 1;
    this.setState({ doubleFaultsA: breakPointsAPlusOne });
  }
  acesAButtonMinusClicked(): void {
    let breakPointsAMinusOne = this.state.acesA - 1;
    this.setState({ acesA: breakPointsAMinusOne });
  }
  acesAButtonPlusClicked(): void {
    let breakPointsAPlusOne = this.state.acesA + 1;
    this.setState({ acesA: breakPointsAPlusOne });
  }
  //#endregion

  //#region PLAYERB
  gamesBPlusClicked(): void {
    let gamePlus = this.state.gameB + 1;
    this.setState({ gameB: gamePlus });
  }
  breakPointsBWonMinusClicked(): void {
    let breakPointsBWonMinusOne = this.state.breakPointsBWon - 1;
    this.setState({ breakPointsBWon: breakPointsBWonMinusOne });
  }
  breakPointsBWonPlusClicked(): void {
    let breakPointsBWonPlusOne = this.state.breakPointsBWon + 1;
    this.setState({ breakPointsBWon: breakPointsBWonPlusOne });
  }
  breakPointsBAttMinusClicked(): void {
    let breakPointsBAttMinusOne = this.state.breakPointsBAtt - 1;
    this.setState({ breakPointsBAtt: breakPointsBAttMinusOne });
  }
  breakPointsBAttPlusClicked(): void {
    let breakPointsBAttPlusOne = this.state.breakPointsBAtt + 1;
    this.setState({ breakPointsBAtt: breakPointsBAttPlusOne });
  }

  pointsBMinutClicked(): void {
    let breakPointsAMinusOne = this.state.pointsInGameB - 1;
    this.setState({ pointsInGameB: breakPointsAMinusOne });
  }
  pointsBPlusClicked(): void {
    let breakPointsAPlusOne = this.state.pointsInGameB + 1;
    this.setState({ pointsInGameB: breakPointsAPlusOne });
  }
  gamesBMinusClicked(): void {
    let breakPointsAMinusOne = this.state.gameB - 1;
    this.setState({ gameB: breakPointsAMinusOne });
  }
  setBMinusClicked(): void {
    let breakPointsAMinusOne = this.state.setB - 1;
    this.setState({ setB: breakPointsAMinusOne });
  }
  setBPlusClicked(): void {
    let breakPointsAPlusOne = this.state.setB + 1;
    this.setState({ setB: breakPointsAPlusOne });
  }
  totalPointsBMinusClicked(): void {
    let breakPointsAMinusOne = this.state.totalPointsB - 1;
    this.setState({ totalPointsB: breakPointsAMinusOne });
  }
  totalPointsBPlusClicked(): void {
    let breakPointsAPlusOne = this.state.totalPointsB + 1;
    this.setState({ totalPointsB: breakPointsAPlusOne });
  }
  unforcedErrorsBMinusClicked(): void {
    let breakPointsAMinusOne = this.state.unforcedErrorsB - 1;
    this.setState({ unforcedErrorsB: breakPointsAMinusOne });
  }
  unforcedErrorsBPlusClicked(): void {
    let breakPointsAPlusOne = this.state.unforcedErrorsB + 1;
    this.setState({ unforcedErrorsB: breakPointsAPlusOne });
  }
  doubleFaultsBMinusClicked(): void {
    let breakPointsAMinusOne = this.state.doubleFaultsB - 1;
    this.setState({ doubleFaultsB: breakPointsAMinusOne });
  }
  doubleFaultsBPlusClicked(): void {
    let breakPointsAPlusOne = this.state.doubleFaultsB + 1;
    this.setState({ doubleFaultsB: breakPointsAPlusOne });
  }
  acesBButtonMinusClicked(): void {
    let breakPointsAMinusOne = this.state.acesB - 1;
    this.setState({ acesB: breakPointsAMinusOne });
  }
  acesBButtonPlusClicked(): void {
    let breakPointsAPlusOne = this.state.acesB + 1;
    this.setState({ acesB: breakPointsAPlusOne });
  }

  backhandWinnersBMinusClicked(): void {
    let backhandWinnersBWonMinusOne = this.state.backhandWinnersB - 1;
    this.setState({ backhandWinnersB: backhandWinnersBWonMinusOne });
  }
  backhandWinnersBPlusClicked(): void {
    let backhandWinnersPlusOne = this.state.backhandWinnersB + 1;
    this.setState({ backhandWinnersB: backhandWinnersPlusOne });
  }
  forehandWinnersBMinusClicked(): void {
    let forehandWinnersMinusOne = this.state.forehandWinnersB - 1;
    this.setState({ forehandWinnersB: forehandWinnersMinusOne });
  }
  forehandWinnersBPlusClicked(): void {
    let forehandWinnersPlusOne = this.state.forehandWinnersB + 1;
    this.setState({ forehandWinnersB: forehandWinnersPlusOne });
  }
  //#endregion

  async AddStatistic(): Promise<void> {
    let statistic: Statistic = new Statistic(
      this.props.matchid,
      this.state.acesA,
      this.state.acesB,
      this.state.doubleFaultsA,
      this.state.doubleFaultsB,
      this.state.unforcedErrorsA,
      this.state.unforcedErrorsB,
      this.state.totalPointsA,
      this.state.totalPointsB
    );
    let set: Set = new Set(
      this.props.matchid,
      1,
      this.state.gameA,
      this.state.gameB,
      true
    );
    let game: Game = new Game(
      this.props.matchid,
      this.state.pointsInGameA,
      this.state.pointsInGameB
    );
    let winner: Winner = new Winner(
      this.props.matchid,
      this.state.forehandWinnersA,
      this.state.backhandWinnersA,
      this.state.forehandWinnersA + this.state.backhandWinnersA,
      this.state.forehandWinnersB,
      this.state.backhandWinnersB,
      this.state.forehandWinnersB + this.state.backhandWinnersB
    );
    let breakPt: BreakPt = new BreakPt(
      this.props.matchid,
      this.state.breakPointsAAtt,
      this.state.breakPointsAWon,
      this.state.breakPointsBAtt,
      this.state.breakPointsBWon
    );
    await fetch(redisStatisticURL, {
      method: POST,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(statistic)
    }).then(response => {
      response.json().then(data => {});
    });

    await fetch(redisSetURL, {
      method: POST,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(set)
    }).then(response => {
      response.json().then(data => {});
    });
    await fetch(redisGameURL, {
      method: POST,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(game)
    }).then(response => {
      response.json().then(data => {});
    });
    await fetch(redisWinnerURL, {
      method: POST,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(winner)
    }).then(response => {
      response.json().then(data => {});
    });
    await fetch(redisBreakPtURL, {
      method: POST,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(breakPt)
    }).then(response => {
      response.json().then(data => {});
    });
    await alert("Statistic changed");
  }
  finishMatch(): void {
    let statisticsCassandra = {
      matchid: this.props.matchid,
      player1Aces: this.state.acesA,
      player2Aces: this.state.acesB,
      player1DoubleFaults: this.state.doubleFaultsA,
      player2DoubleFaults: this.state.doubleFaultsB,
      player1UnforcedErrors: this.state.unforcedErrorsA,
      player2UnforcedErrors: this.state.unforcedErrorsB,
      player1TotalPoints: this.state.totalPointsA,
      player2TotalPoints: this.state.totalPointsB
    }
    createStatisticService(statisticsCassandra);
  }
}
export default AdminStatistic;
