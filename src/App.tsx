import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavComponent from "./Components/NavComponent/navComponent";
import ClientMatch from "./Components/ClientMatchComponent/clientMatch";
import QuestionAnswers from "./Components/QuestionsComponent/questionAnswers";
import Questions from "./Components/QuestionsComponent/questions";
export type Props = {};
interface IState {
  nmbr: number;
  nick: string;
  message: string;
  messages: string[];
  hubConnection: any;
}
class App extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nmbr: 2,
      nick: "",
      message: "",
      messages: [],
      hubConnection: null
    };
  }

  clickedButtonCancel(ev: any) {
    this.setState({ nmbr: 10 });
  }
  render() {
    
    return (
      // <div className="body">
      //   <div className="header">
      //     <NavComponent />
      //   </div>
      //   <div className="container">
      //     {/* <div>
      //     {this.state.nmbr > 3 ? <Login /> : <Home />}
      //     <button
      //       onClick={ev => this.clickedButtonCancel(ev)}
      //       className="meetup-cancel-button"
      //     >
      //       Click me
      //     </button>
      //   </div>
      //   <Register /> */}
      //   <AdminStatistic key={1} matchId="caos" />
      //     <ClientMatch key={2} matchID="caos" player1="Novak Djokovic" player2="Rafael Nadal"/>
      //   </div>
      // </div>
      <div>
        <Questions />
        <ClientMatch
        key={2}
        matchid="cao"
        player1="Nikola"
        player2="Milan" />
      </div>
    );
  }
}

export default App;
