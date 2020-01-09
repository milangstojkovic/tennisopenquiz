import React, { Component } from "react";
import { User } from "../../Models/Model";
import {createUserService, getUsersService} from '../../CassandraServices/user.service';
interface Props {}
interface IState {
  email: string;
  password: string;
  username: string;
}
const emptyString = "";
class Register extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: emptyString,
      email: emptyString,
      password: emptyString
    };
  }
  render() {
    return (
      <form className="login-form">
        <label>Username:</label>
        <input
          type="string"
          value={this.state.username}
          placeholder="Add username"
          onChange={e => this.handleChangeUsername(e)}
          className="input-email"
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
  handleChangePassword(e: any): void {
    this.setState({ password: e.target.value });
  }
  handleChangeEmail(e: any): void {
    this.setState({ email: e.target.value });
  }
  handleChangeUsername(e: any): void {
    this.setState({ username: e.target.value });
  }
  buttonRegisterClicked(e: any): void {
      e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      score: 0
    };
    createUserService(user as User);
    }
}
export default Register;
