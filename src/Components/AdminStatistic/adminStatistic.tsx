import React, { Component } from "react";
import "./adminStatistic.css";
import { Button } from "react-bootstrap";
interface Props {}
interface IState {
  acesA: number;
  acesB: Number;

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

  unforcedErrorsA:number;
  unforcedErrorsB:number;
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

      breakPointsA: 0,
      breakPointsB: 0,

      pointsInGameA: 0,
      pointsInGameB: 0,

      unforcedErrorsA:0,
      unforcedErrorsB:0
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
              <Button>+</Button>
              <Button className="button-minus">-</Button>
            </div>
          </div>
          <div className="doubleFaults">
            <label className="label">Double faults: {this.state.doubleFaultsA}</label>
            <div className="buttons">
              <Button>+</Button>
              <Button className="button-minus">-</Button>
            </div>
          </div>
          <div className="unforcedErrors">
            <label className="label">Unforced errors: {this.state.unforcedErrorsA}</label>
            <div className="buttons">
              <Button>+</Button>
              <Button className="button-minus">-</Button>
            </div>
          </div>
          <div className="totalPoints">
            <label className="label">Total points: {this.state.totalPointsA}</label>
            <div className="buttons">
              <Button>+</Button>
              <Button className="button-minus">-</Button>
            </div>
          </div>
          <div className="set">
            <label className="label">Sets: {this.state.setA}</label>
            <div className="buttons">
              <Button>+</Button>
              <Button className="button-minus">-</Button>{" "}
            </div>
          </div>
          <div className="games">
            <label className="label">Games: {this.state.gameA}</label>
            <div className="buttons">
              <Button>+</Button>
              <Button className="button-minus">-</Button>{" "}
            </div>
          </div>
          <div className="points">
            <label className="label">Points: {this.state.pointsInGameA}</label>
            <div className="buttons">
              <Button>+</Button>
              <Button className="button-minus">-</Button>{" "}
            </div>
          </div>
          <div className="breakPoints">
            <label className="label">Break points: {this.state.breakPointsA}</label>
            <div className="buttons">
              <Button>+</Button>
              <Button className="button-minus">-</Button>{" "}
            </div>
          </div>
        </div>
        <div className="playerB-statistic">
          <h1>PLAYER B</h1>
          <div className="aces">
            <label className="label">Aces: {this.state.acesB}</label>
            <div className="buttons">
              <Button>+</Button>
              <Button className="button-minus">-</Button>
            </div>
          </div>
          <div className="doubleFaults">
            <label className="label">Double faults: {this.state.doubleFaultsB}</label>
            <div className="buttons">
              <Button>+</Button>
              <Button className="button-minus">-</Button>
            </div>
          </div>
          <div className="unforcedErrors">
            <label className="label">Unforced errors: {this.state.unforcedErrorsB}</label>
            <div className="buttons">
              <Button>+</Button>
              <Button className="button-minus">-</Button>
            </div>
          </div>
          <div className="totalPoints">
            <label className="label">Total points: {this.state.totalPointsB}</label>
            <div className="buttons">
              <Button>+</Button>
              <Button className="button-minus">-</Button>
            </div>
          </div>
          <div className="set">
            <label className="label">Sets: {this.state.setB}</label>
            <div className="buttons">
              <Button>+</Button>
              <Button className="button-minus">-</Button>{" "}
            </div>
          </div>
          <div className="games">
            <label className="label">Games: {this.state.gameB}</label>
            <div className="buttons">
              <Button>+</Button>
              <Button className="button-minus">-</Button>{" "}
            </div>
          </div>
          <div className="points">
            <label className="label">Points: {this.state.pointsInGameB}</label>
            <div className="buttons">
              <Button>+</Button>
              <Button className="button-minus">-</Button>{" "}
            </div>
          </div>
          <div className="breakPoints">
            <label className="label">Break points: {this.state.breakPointsB}</label>
            <div className="buttons">
              <Button>+</Button>
              <Button className="button-minus">-</Button>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AdminStatistic;
