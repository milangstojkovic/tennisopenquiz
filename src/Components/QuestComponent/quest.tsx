import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Question } from "../../Models/Model";
export type Props = {};
interface IState {
  question: string;
  
}
const POST = "POST";
const GET="GET";
const PUT="PUT";
const redisQuestionUR = "https://localhost:44379/api/question";

class Quest extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = { question: ""  };
  }
  render() {
    return (
      <div>
        <input
          type="text"
          onChange={event => this.handleChangeQuestion(event)}
        ></input>
        <Button
          className="button-send"
          onClick={() => this.addQuestion(this.state.question)}
        >
          Send to Redis
        </Button>
        <Button
          className="button-get"
          onClick={() => this.getQuestion(this.state.question)}
        >
          Send to Redis
        </Button>
      </div>
    );
  }
    getQuestion(question: string): void {
        throw new Error("Method not implemented.");
    }
  handleChangeQuestion(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ question: event.target.value });
  }
  
  sendToRedis(questionText: string): void {}
  async addQuestion(question: string): Promise<any> {
    fetch(redisQuestionUR, {
      method: POST,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        questionText: this.state.question})
    }).then(response => {
      console.log({}, { response });
    });
  }
}
export default Quest;
