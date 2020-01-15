import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Questions from "./Components/QuestionsComponent/questions";
import AdminHome from "./Components/AdminComponent/adminHome";
import Register from "./Components/RegisterComponent/register";
import Login from "./Components/LoginComponent/login";
import AdminStatistic from "./Components/AdminStatistic/adminStatistic";
import NavComponent from "./Components/NavComponent/navComponent";
import { updateUserService } from "./CassandraServices/user.service";
import {User}from "./Models/Model";
import MatchList from "./Components/MatchListComponent/matchList";
import ClientMatch from "./Components/ClientMatchComponent/clientMatch";
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
          <ClientMatch />
          <Questions />
        </div>
      </div>
    );
  }
}

export default App;
