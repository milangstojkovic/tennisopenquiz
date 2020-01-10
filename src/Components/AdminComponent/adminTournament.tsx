import React, { Component } from "react";
import { User } from "../../Models/Model";
interface Props {}
interface IState {
  name: string;
  date: string;
  surface: string;
}
const emptyString = "";
class AdminTournament extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: emptyString,
      date: emptyString,
      surface: emptyString
    };
  }
  render() {
    return (
      <form className="tournamentAdd-form">
        <label>Name:</label>
        <input
          type="string"
          value={this.state.name}
          placeholder="Add name of tournament"
          onChange={e => this.handleChangeTournament(e)}
          className="input-name"
        ></input>
        <label>Email:</label>
        <input
          type="email"
          value={this.state.email}
          placeholder="Add email"
          onChange={e => this.handleChangeEmail(e)}
          className="input-email"
        ></input>
        <label>Password:</label>
        <input
          type="password"
          value={this.state.password}
          placeholder="Add password"
          onChange={e => this.handleChangePassword(e)}
          className="input-password"
        ></input>
        <div className="buttons-login-register">
          <button
            id="btnReg"
            className="button-register"
            onClick={e => this.buttonRegisterClicked(e)}
          >
            {" "}
            Register{" "}
          </button>
        </div>
      </form>
    );
  }
}
export default AdminTournament;
