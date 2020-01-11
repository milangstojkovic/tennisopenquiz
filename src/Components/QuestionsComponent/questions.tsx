import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./questions.css";
export type Props = {};
class Question {
  constructor(
    public questionId: string,
    public questionText: string,
    public active: boolean
  ) {}
}
class Answer {
  constructor(
    public answerId: string,
    public answerText: string,
    public points: number,
    public questionId: string
  ) {}
}
interface IState {
  question: Question;
  questionInput: string;
  answerInput: string;
}
const emptyString = "";
const False = false;
const POST = "POST";
const GET = "GET";
const PUT = "PUT";
const redisQuestionUR = "https://localhost:44379/api/question";
const redisAnswerUR = "https://localhost:44379/api/answer";

var ID = function() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};
class Questions extends Component<Props, IState> {
  questions: Question[];
  answers: Answer[];
  constructor(props: Props) {
    super(props);
    this.state = {
      questionInput: emptyString,
      answerInput: emptyString,
      question: new Question(emptyString, emptyString, False)
    };
    this.questions = [];
    this.answers = [];
  }
  render() {
    return (
      <div className="questions-form">
        <label>Question :</label>
        <input
          type="text"
          onChange={event => this.handleChangeQuestion(event)}
        ></input>
        <label>Add answers:</label>
        <input
          type="text"
          onChange={event => this.handleChangeAnswer(event)}
        ></input>
        <Button
          className="button-send"
          onClick={() => this.addQuestion(this.state.questionInput)}
        >
          Send to Redis
        </Button>
        <Button
          className="button-send-answer"
          onClick={() => this.addAnswer(this.state.answerInput)}
        >
          Send Answer to Redis
        </Button>
      </div>
    );
  }
  handleChangeAnswer(event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Method not implemented.");
  }
  handleChangeQuestion(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ questionInput: event.target.value });
  }
  async addQuestion(question: string): Promise<any> {
    fetch(redisQuestionUR, {
      method: POST,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        questionId: ID(),
        questionText: this.state.questionInput
      })
    }).then(response => {
      response.json().then(data => this.questions.push(data));
      console.log(this.questions);
    });
  }
  async addAnswer(answerText: string): Promise<any> {
    fetch(redisAnswerUR, {
      method: POST,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        answerID: ID(),
        answerText: this.state.answerInput
      })
    }).then(response => {
      response.json().then(data => this.answers.push(data));
      console.log(this.answers);
    });
  }
}
export default Questions;
