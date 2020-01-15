import React, { Component } from "react";
import "./clientMatch.css";
import { Button } from "react-bootstrap";
interface Props {
    matchID:string
}
interface IState {
}
class ClientMatch extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="client-match">
        <div className="player1">
        </div>
        <div className="player2"></div>
      </div>
    );
  }
}
export default ClientMatch;
