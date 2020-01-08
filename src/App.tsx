import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/HomeComponent/home";
import { Nav } from "react-bootstrap";
import Register from "./Components/RegisterComponent/register";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Login from "./Components/LoginComponent/login";
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
        <div>
          {this.state.nmbr > 3 ? <Login /> : <Home />}
          <button
            onClick={ev => this.clickedButtonCancel(ev)}
            className="meetup-cancel-button"
          >
            Click me
          </button>
        </div>
        <Register />
      </div>
    );
  }
}

export default App;
