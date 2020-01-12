import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Quest from "./Components/QuestComponent/quest";
import AdminMatches from "./Components/AdminComponent/adminMatches";
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
      <div>
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
        <AdminMatches/>
        <Quest />
      </div>
    );
  }
}

export default App;
