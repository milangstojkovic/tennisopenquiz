import React, { Component } from "react";
import "./home.css";
import Login from "../LoginComponent/login";
import Register from "../RegisterComponent/register";
export type Props = {};

class Home extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <div id="c">
        <table className="btns"><thead><tr>
        <th className="login"><Login/></th>
        <th className="login"><Register/></th>
        </tr>
        </thead>
        </table>
        <hr></hr>
        <img
            src={require("../../Resources/Logo1Default11.png")}
            className="App-logo"
            alt="logo"
          />
        
      </div>
    );
  }
}

export default Home;
