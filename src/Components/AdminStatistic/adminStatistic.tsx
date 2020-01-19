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

  breakPointsA: number;
  breakPointsB: number;

  pointsInGameA: number;
  pointsInGameB: number;

  unforcedErrorsA: number;
  unforcedErrorsB: number;
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
    public matchID: string,
    public Player1Points: number,
    public Player2Points: number
  ) {}
}
class Set {
  constructor(
    public MatchID: string,
    public setNo: number,
    public player1GamesWon: number,
    public player2GamesWon: number,
    public live: boolean
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

      breakPointsA: 0,
      breakPointsB: 0,

      pointsInGameA: 0,
      pointsInGameB: 0,

      unforcedErrorsA: 0,
      unforcedErrorsB: 0
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
              Break points: {this.state.breakPointsA}
            </label>
            <div className="buttons">
              <Button onClick={() => this.breakPointsAPlusClicked()}>+</Button>
              <Button
                className="button-minus"
                onClick={() => this.breakPointsAMinusClicked()}
              >
                -
              </Button>{" "}
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
              Break points: {this.state.breakPointsB}
            </label>
            <div className="buttons">
              <Button onClick={() => this.breakPointsBPlusClicked()}>+</Button>
              <Button
                className="button-minus"
                onClick={() => this.breakPointsBMinusClicked()}
              >
                -
              </Button>{" "}
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
  breakPointsAMinusClicked(): void {
    let breakPointsAMinusOne = this.state.breakPointsA - 1;
    this.setState({ breakPointsA: breakPointsAMinusOne });
  }
  breakPointsAPlusClicked(): void {
    let breakPointsAPlusOne = this.state.breakPointsA + 1;
    this.setState({ breakPointsA: breakPointsAPlusOne });
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
  breakPointsBMinusClicked(): void {
    let breakPointsAMinusOne = this.state.breakPointsB - 1;
    this.setState({ breakPointsB: breakPointsAMinusOne });
  }
  breakPointsBPlusClicked(): void {
    let breakPointsAPlusOne = this.state.breakPointsB + 1;
    this.setState({ breakPointsB: breakPointsAPlusOne });
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

    alert("Statistic changed");
  }
}
export default AdminStatistic;
