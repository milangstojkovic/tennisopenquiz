import React, { Component, useReducer } from "react";
import { getUsersService } from "../../CassandraServices/user.service";
import { User } from "../../Models/Model";

interface Props {}
interface IState {
    loading:boolean;
}
const emptyString = "";
class Userscomp extends Component<Props, IState> {
  users!: User[];
  constructor(props: Props) {
    super(props);
    this.state = {
        loading:false
    };
    this.getData();
  }
  
  render() {
    if(!this.state.loading)
    return null;
    const playersRender = this.users.map((user, index) =>
    <tr className="user" key={index}>
        <td>{index+1}</td>
        <td> {user.username}</td>
        <td>{user.score}</td>
    </tr>)
    return (
      <form >
        <table>
            <thead>
                <tr>
                    <th>No.</th><th>Username</th><th>Score</th>
                </tr>
            </thead>
            <tbody>
                {playersRender}
            </tbody>
        </table>
      </form>
    );
  }
  async getData(): Promise<void> {
    await getUsersService().then(res=>this.users=res.filter(r=>r.username!="admin"));
    await this.users.sort((player1, player2) => player2.score - player1.score);
    await this.setState({ loading: true });
    this.render();
}
}
export default Userscomp;
