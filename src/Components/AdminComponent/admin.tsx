import React, { Component } from "react";
import "./login.css";

interface Props { }
interface IState {
  email: string;
  password: string;
}
const emptyString = "";
class Admin extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: emptyString,
      password: emptyString
    };
  }
  handleChangeEmail(event: any): void {
    this.setState({ email: event.target.value });
  }
  handleChangePassword(event: any): void {
    this.setState({ password: event.target.value });
  }
  render() {
    return (
      <form className="admin-form">
        <label>Dobrodosli na admin stranicu:</label>
        <input
          type="email"
          value={this.state.email}
          onChange={e => this.handleChangeEmail(e)}
          placeholder="Add email"
          className="input-email"
        ></input>
      </form>
    );
  }
}
export default Admin;
