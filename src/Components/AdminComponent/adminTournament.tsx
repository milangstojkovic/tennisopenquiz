import React, { Component } from "react";
import { User } from "../../Models/Model";
interface Props {}
interface IState {
  name: string;
  date: string;
  surface: string;
  password: string;
  email: string;
}
const emptyString = "";
class AdminTournament extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: emptyString,
      date: emptyString,
      surface: emptyString,
      password:emptyString,
      email:emptyString
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
  buttonRegisterClicked(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    throw new Error("Method not implemented.");
  }
  handleChangePassword(e: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Method not implemented.");
  }
  handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Method not implemented.");
  }
  handleChangeTournament(e: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Method not implemented.");
  }
}
export default AdminTournament;
