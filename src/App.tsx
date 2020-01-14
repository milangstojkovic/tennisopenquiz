import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Questions from "./Components/QuestionsComponent/questions";
import AdminHome from "./Components/AdminComponent/adminHome";
import Register from "./Components/RegisterComponent/register";
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
        <AdminHome/>
        <Questions />
        <AdminStatistic />
      </div>
    );
  }
}

export default App;
