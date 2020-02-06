import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavComponent from "./Components/NavComponent/navComponent";
import Home from "./Components/HomeComponent/home";
export type Props = {};
interface IState {
  nmbr: number;
  question: boolean;
}
class App extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nmbr: 2,
      question:false
    };
  }
  clickedButtonCancel(ev: any) {
    this.setState({ nmbr: 10 });
  }
  render() {
    return (
      <div className="body">
        <div className="header">
          <NavComponent />
        </div>
<<<<<<< HEAD
      <div className="container">

    <Home/>
    </div>
=======
        <div className="container">
          {/* <div>
          {this.state.nmbr > 3 ? <Login /> : <Home />}
          <button
            onClick={ev => this.clickedButtonCancel(ev)}
            className="meetup-cancel-button"
          >
            Click me
          </button>
        </div>
        <Register /> */}
        <AdminStatistic key={1} matchId="caos" />
          <ClientMatch key={2} matchID="caos" player1="Novak Djokovic" player2="Rafael Nadal"/>
        </div>
>>>>>>> 2be6fea6525a9747979db7bb6197380403bee5f6
      </div>
    );
  }
}

export default App;
