import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Quest from "./Components/QuestComponent/quest";
import AdminMatches from "./Components/AdminComponent/adminMatches";
import AdminPlayer from "./Components/AdminComponent/adminPlayer";
import AdminTournament from "./Components/AdminComponent/adminTournament";
import Questions from "./Components/QuestionsComponent/questions";
import Login from "./Components/LoginComponent/login";
import AdminStatistic from "./Components/AdminStatistic/adminStatistic";
export type Props = {};
interface IState {
  nmbr: number;
}
class App extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nmbr: 2
    };
  }
  clickedButtonCancel(ev: any) {
    this.setState({ nmbr: 10 });
  }
  render() {
    return (
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
        <AdminStatistic />
      </div>
    );
  }
}

export default App;
