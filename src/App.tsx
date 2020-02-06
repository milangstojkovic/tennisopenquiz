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
      <div className="container">

    <Home/>
    </div>
      </div>
    );
  }
}

export default App;
