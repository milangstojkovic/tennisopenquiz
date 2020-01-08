import React, { Component } from "react";
import "./login.css";

interface Props {}
interface IState {
  email: string;
  password: string;
}
const emptyString = "";
class Login extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: emptyString,
      password: emptyString
    };
  }
  handleChangeEmail(event: any) {
    this.setState({ email: event.target.value });
  }
  handleChangePassword(event: any) {
    this.setState({ password: event.target.value });
  }
  render() {
    return (
      <form className="login-form">
        <label>Email:</label>
        <input
          type="email"
          value={this.state.email}
          onChange={e => this.handleChangeEmail(e)}
          className="input-email"
        ></input>
        <label>Password:</label>
        <input
          type="password"
          value={this.state.password}
          onChange={e => this.handleChangePassword(e)}
          className="input-password"
        ></input>
        <div className="buttons-login-register">
          <button className="button-login"> Login </button>
          <button className="button-login"> Register </button>
        </div>
      </form>
    );
  }
}
export default Login;
