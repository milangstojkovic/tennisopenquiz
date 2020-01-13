import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Quest from "./Components/QuestComponent/quest";
<<<<<<< HEAD
import AdminMatches from "./Components/AdminComponent/adminMatches";
import AdminPlayer from "./Components/AdminComponent/adminPlayer";
import AdminTournament from "./Components/AdminComponent/adminTournament";
=======
import Questions from "./Components/QuestionsComponent/questions";
>>>>>>> b7c516e34462748919b5e7b2d74ba868cb9c3dd1
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
      <div className="container">
        {/* <div>
          {this.state.nmbr > 3 ? <Login /> : <Home />}
          <button
            onClick={ev => this.clickedButtonCancel(ev)}
            className="meetup-cancel-button"
          >
            Click me
          </button>
        </div>
        <Register /> */}
<<<<<<< HEAD
        <AdminTournament/>
=======
        <Questions />
>>>>>>> b7c516e34462748919b5e7b2d74ba868cb9c3dd1
      </div>
    );
  }
}

export default App;
