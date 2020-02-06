import React, { Component } from "react";
import "./clientMatch.css";


interface Props {
}
interface IState {
}


class ClientMatch extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
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

  async createListener(socket: any) {

  }

}
export default ClientMatch;
