import React, { Component } from "react";
import "./adminStatistic.css";
import { Button } from "react-bootstrap";
interface Props {
  matchId: string;
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
    public matchID: string,
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
    public matchId: string,
    public Player1Points: number,
    public Player2Points: number
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
        <div className="playerA-statistic">
          <h1>PLAYER A</h1>
          <div className="aces">
            <label className="label">Aces: {this.state.acesA}</label>
            <div className="buttons">
              <Button onClick={() => this.acesAButtonPlusClicked()}>+</Button>
              <Button
                className="button-minus"
                onClick={() => this.acesAButtonMinusClicked()}
              >
                -
              </Button>
            </div>
          </div>
          <div className="doubleFaults">
            <label className="label">
              Double faults: {this.state.doubleFaultsA}
            </label>
            <div className="buttons">
              <Button onClick={() => this.doubleFaultsAPlusClicked()}>+</Button>
              <Button
                className="button-minus"
                onClick={() => this.doubleFaultsAMinusClicked()}
              >
                -
              </Button>
            </div>
          </div>
          <div className="unforcedErrors">
            <label className="label">
              Unforced errors: {this.state.unforcedErrorsA}
            </label>
            <div className="buttons">
              <Button onClick={() => this.unforcedErrorsAPlusClicked()}>
                +
              </Button>
              <Button
                className="button-minus"
                onClick={() => this.unforcedErrorsAMinusClicked()}
              >
                -
              </Button>
            </div>
          </div>
          <div className="totalPoints">
            <label className="label">
              Total points: {this.state.totalPointsA}
            </label>
            <div className="buttons">
              <Button onClick={() => this.totalPointsAPlusClicked()}>+</Button>
              <Button
                className="button-minus"
                onClick={() => this.totalPointsAMinusClicked()}
              >
                -
              </Button>
            </div>
          </div>
          <div className="set">
            <label className="label">Sets: {this.state.setA}</label>
            <div className="buttons">
              <Button onClick={() => this.setAPlusClicked()}>+</Button>
              <Button
                className="button-minus"
                onClick={() => this.setAMinusClicked()}
              >
                -
              </Button>{" "}
            </div>
          </div>
          <div className="games">
            <label className="label">Games: {this.state.gameA}</label>
            <div className="buttons">
              <Button onClick={() => this.gamesAPlusClicked()}>+</Button>
              <Button
                className="button-minus"
                onClick={() => this.gamesAMinusClicked()}
              >
                -
              </Button>{" "}
            </div>
          </div>
          <div className="points">
            <label className="label">Points: {this.state.pointsInGameA}</label>
            <div className="buttons">
              <Button onClick={() => this.pointsAPlusClicked()}>+</Button>
              <Button
                className="button-minus"
                onClick={() => this.pointsAMinutClicked()}
              >
                -
              </Button>{" "}
            </div>
          </div>
          <div className="breakPoints">
            <label className="label">
              Break points att: {this.state.breakPointsAAtt}
            </label>
            <div className="buttons">
              <Button onClick={() => this.breakPointsAAttPlusClicked()}>
                +
              </Button>
              <Button
                className="button-minus"
                onClick={() => this.breakPointsAAttMinusClicked()}
              >
                -
              </Button>{" "}
            </div>
          </div>
          <div className="breakPoints">
            <label className="label">
              Break points won: {this.state.breakPointsAWon}
            </label>
            <div className="buttons">
              <Button onClick={() => this.breakPointsAWonPlusClicked()}>
                +
              </Button>
              <Button
                className="button-minus"
                onClick={() => this.breakPointsAWonMinusClicked()}
              >
                -
              </Button>{" "}
            </div>
          </div>
          <div className="winners">
            <label className="label">
              Forehand winners: {this.state.forehandWinnersA}
            </label>
            <div className="buttons">
              <Button onClick={() => this.forehandWinnersAPlusClicked()}>
                +
              </Button>
              <Button
                className="button-minus"
                onClick={() => this.forehandWinnersAMinusClicked()}
              >
                -
              </Button>
            </div>
          </div>
          <div className="winners">
            <label className="label">
              Backhand winners: {this.state.backhandWinnersA}
            </label>
            <div className="buttons">
              <Button onClick={() => this.backhandWinnersAPlusClicked()}>
                +
              </Button>
              <Button
                className="button-minus"
                onClick={() => this.backhandWinnersAMinusClicked()}
              >
                -
              </Button>
            </div>
          </div>
        </div>
        <div className="playerB-statistic">
          <h1>PLAYER B</h1>
          <div className="aces">
            <label className="label">Aces: {this.state.acesB}</label>
            <div className="buttons">
              <Button onClick={() => this.acesBButtonPlusClicked()}>+</Button>
              <Button
                className="button-minus"
                onClick={() => this.acesBButtonMinusClicked()}
              >
                -
              </Button>
            </div>
          </div>
          <div className="doubleFaults">
            <label className="label">
              Double faults: {this.state.doubleFaultsB}
            </label>
            <div className="buttons">
              <Button onClick={() => this.doubleFaultsBPlusClicked()}>+</Button>
              <Button
                className="button-minus"
                onClick={() => this.doubleFaultsBMinusClicked()}
              >
                -
              </Button>
            </div>
          </div>
          <div className="unforcedErrors">
            <label className="label">
              Unforced errors: {this.state.unforcedErrorsB}
            </label>
            <div className="buttons">
              <Button onClick={() => this.unforcedErrorsBPlusClicked()}>
                +
              </Button>
              <Button
                className="button-minus"
                onClick={() => this.unforcedErrorsBMinusClicked()}
              >
                -
              </Button>
            </div>
          </div>
          <div className="totalPoints">
            <label className="label">
              Total points: {this.state.totalPointsB}
            </label>
            <div className="buttons">
              <Button onClick={() => this.totalPointsBPlusClicked()}>+</Button>
              <Button
                className="button-minus"
                onClick={() => this.totalPointsBMinusClicked()}
              >
                -
              </Button>
            </div>
          </div>
          <div className="set">
            <label className="label">Sets: {this.state.setB}</label>
            <div className="buttons">
              <Button onClick={() => this.setBPlusClicked()}>+</Button>
              <Button
                className="button-minus"
                onClick={() => this.setBMinusClicked()}
              >
                -
              </Button>{" "}
            </div>
          </div>
          <div className="games">
            <label className="label">Games: {this.state.gameB}</label>
            <div className="buttons">
              <Button onClick={() => this.gamesBPlusClicked()}>+</Button>
              <Button
                className="button-minus"
                onClick={() => this.gamesBMinusClicked()}
              >
                -
              </Button>{" "}
            </div>
          </div>
          <div className="points">
            <label className="label">Points: {this.state.pointsInGameB}</label>
            <div className="buttons">
              <Button onClick={() => this.pointsBPlusClicked()}>+</Button>
              <Button
                className="button-minus"
                onClick={() => this.pointsBMinutClicked()}
              >
                -
              </Button>{" "}
            </div>
          </div>
          <div className="breakPoints">
            <label className="label">
              Break points att: {this.state.breakPointsBAtt}
            </label>
            <div className="buttons">
              <Button onClick={() => this.breakPointsBAttPlusClicked()}>
                +
              </Button>
              <Button
                className="button-minus"
                onClick={() => this.breakPointsBAttMinusClicked()}
              >
                -
              </Button>{" "}
            </div>
          </div>
          <div className="breakPoints">
            <label className="label">
              Break points won: {this.state.breakPointsBWon}
            </label>
            <div className="buttons">
              <Button onClick={() => this.breakPointsBWonPlusClicked()}>
                +
              </Button>
              <Button
                className="button-minus"
                onClick={() => this.breakPointsBWonMinusClicked()}
              >
                -
              </Button>{" "}
            </div>
          </div>
          <div className="winners">
            <label className="label">
              Forehand winners: {this.state.forehandWinnersB}
            </label>
            <div className="buttons">
              <Button onClick={() => this.forehandWinnersBPlusClicked()}>
                +
              </Button>
              <Button
                className="button-minus"
                onClick={() => this.forehandWinnersBMinusClicked()}
              >
                -
              </Button>
            </div>
          </div>
          <div className="winners">
            <label className="label">
              Backhand winners: {this.state.backhandWinnersB}
            </label>
            <div className="buttons">
              <Button onClick={() => this.backhandWinnersBPlusClicked()}>
                +
              </Button>
              <Button
                className="button-minus"
                onClick={() => this.backhandWinnersBMinusClicked()}
              >
                -
              </Button>
            </div>
          </div>
        </div>{" "}
        <Button onClick={() => this.AddStatistic()}> ADD REDIS</Button>
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
    this.setState({backhandWinnersA: backhandWinnersAWonMinusOne });
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
      this.props.matchId,
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
      this.props.matchId,
      1,
      this.state.gameA,
      this.state.gameB,
      true
    );
    let game: Game = new Game(
      this.props.matchId,
      this.state.pointsInGameA,
      this.state.pointsInGameB
    );
    let winner:Winner=new Winner(
      this.props.matchId,
      this.state.forehandWinnersA,
      this.state.backhandWinnersA,
      this.state.forehandWinnersA+this.state.backhandWinnersA,
      this.state.forehandWinnersB,
      this.state.backhandWinnersB,
      this.state.forehandWinnersB+this.state.backhandWinnersB
    );
      let breakPt:BreakPt=new BreakPt(
        this.props.matchId,
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
    alert("Statistic changed");
  }
}
export default AdminStatistic;
