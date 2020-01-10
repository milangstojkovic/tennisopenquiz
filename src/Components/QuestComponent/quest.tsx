import React, { Component } from "react";
import { Button } from "react-bootstrap";
export type Props = {};
interface IState {
  question: string;
  questionKey: string;
}
const POST = "POST";
const redisQuestionUR = "https://localhost:44379/api/question";

class Quest extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = { question: "", questionKey: "" };
  }
  render() {
    return (
      <div>
        <input
          type="text"
          onChange={event => this.handleChangeQuestion(event)}
        ></input>
        <input
          type="text"
          onChange={event => this.handleChangeQuestionKey(event)}
        ></input>
        <Button
          className="button-send"
          onClick={() => this.addMeetup(this.state.question)}
        >
          Send to Redis
        </Button>
      </div>
    );
  }
  handleChangeQuestion(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ question: event.target.value });
  }
  handleChangeQuestionKey(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ questionKey: event.target.value });
  }
  sendToRedis(questionText: string): void {}
  async addMeetup(question: string): Promise<any> {
    fetch(redisQuestionUR, {
      method: POST,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        questionText: this.state.question,
        questionId: this.state.questionKey
      })
    }).then(response => {
      console.log({}, { response });
    });
  }
}
export default Quest;
