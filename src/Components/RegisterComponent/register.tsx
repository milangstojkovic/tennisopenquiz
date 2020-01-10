import React, { Component } from "react";
import { User } from "../../Models/Model";
import {createUserService, getUserByNameService, getUsersService} from '../../CassandraServices/user.service';
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
  handleChangePassword(e: any): void {
    this.setState({ password: e.target.value });
  }
  async handleChangeEmail(e: any): Promise<void> {
    var target=e.target;
    let emails:User[]=[target as User];
    this.setState({ email: e.target.value });
    await getUsersService().then(res=>{
    emails=res.filter(elemet=>elemet.email===target.value)})
    if(emails.length>0) {
      target.style.backgroundColor='red';
      (document.getElementById("btnReg") as HTMLInputElement).disabled=true;
    }
    else {
      target.style.backgroundColor='white';
      (document.getElementById("btnReg") as HTMLInputElement).disabled=false;
    }
  }
  async handleChangeUsername(e: any): Promise<void> {
    let user;
    var target=e.target;
    this.setState({ username: target.value });
    await getUserByNameService(target.value).then(res=>{user=res.username;});
    if(user==null) {
      target.style.backgroundColor='white';
      (document.getElementById("btnReg") as HTMLInputElement).disabled=false;
    }
    else {
      target.style.backgroundColor='red';
      (document.getElementById("btnReg") as HTMLInputElement).disabled=true;
    }
  }
  buttonRegisterClicked(e: any): void {
      e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    };
    if(!getUserByNameService(user.username)) {
      createUserService(user as User);
    }
  }
}
export default Register;
