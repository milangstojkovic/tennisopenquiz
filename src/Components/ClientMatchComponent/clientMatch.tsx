import React, { Component } from "react";
import "./clientMatch.css";
import { getQuestion } from '../../RedisServices/questionService';
interface Props {
}
interface IState {
  loading: boolean;
}
const redisQuestionURL = "https://localhost/api/question"
class Question {
  answers: Answer[];
  constructor(
    public questionId: string,
    public questionText: string,
    public active: boolean
  ) {
    this.answers = [];
  }
}
class Answer {
  constructor(
    public answerId: string,
    public answerText: string,
    public points: number,
    public questionId: string
  ) { }
}

class ClientMatch extends Component<Props, IState> {
  questions!: Question[];
  questionRendering!: JSX.Element[];
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false
    };
    this.getData();
  }
  render() {
    console.log("render");
    if (this.state.loading)
      return null;
    return (
      <div className="client-match">
        <div className="player1"> {this.questionRendering}
        </div>
        <div className="player2"></div>
      </div>
    );
  }

  async getData(): Promise<void> {
    await getQuestion().then(res => this.questions = res);
    console.log(this.questions.length>0);
    this.questionRendering = (this.questions.map((question, index) => (
      <div key={index}>{question.questionText}</div>)))
    if (this.questionRendering) {
      await this.setState({ loading: false });
      this.render();
    }
  }

}
export default ClientMatch;
