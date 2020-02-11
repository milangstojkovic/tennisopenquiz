import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./questions.css";
import { HubConnectionBuilder } from "@aspnet/signalr";
import * as signalR from "@microsoft/signalr";
export type Props = {};
class Question {
  constructor(
    public questionId: string,
    public questionText: string,
    public answerA: string,
    public answerB: string,
    public answerC: string,
    public answerD: string,
    public points: number,
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
  answerAInput: string;
  answerBInput: string;
  answerCInput: string;
  answerDInput: string;
  points: number;
  stringKeyToReturn: string;
  hubConnection: any;

}
const emptyString = "";
const False = false;
const POST = "POST";

const redisQuestionUR = "https://localhost:44379/api/question";
const redisPublishURL = "https://localhost:44379/api/publish";
const hubConnUrl="https://localhost:44379/qahub";

var ID = function() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
};
class Questions extends Component<Props, IState> {
  questions: Question[];
  answers: Answer[];
  constructor(props: Props) {
    super(props);
    this.state = {
      questionInput: emptyString,
      question: new Question(
        emptyString,
        emptyString,
        emptyString,
        emptyString,
        emptyString,
        emptyString,
        0,
        False
      ),
      answerAInput: emptyString,
      answerBInput: emptyString,
      answerCInput: emptyString,
      answerDInput: emptyString,
      points: 0,
      stringKeyToReturn: emptyString,
      hubConnection:null
    };
    this.questions = [];
    this.answers = [];
  }


  componentDidMount = () => {
    console.log("aaa");
    // const nick: string = "Admin";
    const hubConnection: any = new HubConnectionBuilder()
      .withUrl(hubConnUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.setState({ hubConnection }, () => {
      this.state.hubConnection
        .start(() => console.log("started..."))
        .then(() => console.log("Connection started!"))
        .catch((err: any) =>
          console.log("Error while establishing connection :(")
        );

      this.state.hubConnection.on(
        "sendToAll",
        (nick: string, receivedMessage: string) => {
          // const text = `${nick}: ${receivedMessage}`;
          //const messages = this.state.messages.concat([text]);
          // this.setState({ messages });
        }
      );
    });
  };
  sendMessage = () => {
    this.state.hubConnection
      .invoke("sendToAll", "Admin", this.state.stringKeyToReturn)
      .catch((err: any) => console.error(err));

    //this.setState({ message: "" });
  };


  render() {
    return (
      <div className="admin-qa">
        <div className="question-part">
          <label>Question :</label>
          <textarea
            className="input-question"
            placeholder="Add a question"
            value={this.state.questionInput}
            onChange={event => this.handleChangeQuestion(event)}
            rows={4}
            cols={30}
          />
          <div className="answers-inputs">
            <label> Answers: </label>
            <input
              className="input-answer"
              value={this.state.answerAInput}
              placeholder="Add answer A"
              onChange={event => this.handleChangeAnswerA(event)}
            />
            <input
              className="input-answer"
              value={this.state.answerBInput}
              placeholder="Add answer B"
              onChange={event => this.handleChangeAnswerB(event)}
            />
            <input
              className="input-answer"
              value={this.state.answerCInput}
              placeholder="Add answer C"
              onChange={event => this.handleChangeAnswerC(event)}
            />
            <input
              className="input-answer"
              value={this.state.answerDInput}
              placeholder="Add answer D"
              onChange={event => this.handleChangeAnswerD(event)}
            />
            <input
              type="number"
              id="tentacles"
              className="input-points"
              value={this.state.points}
              placeholder="Add points"
              onChange={event => this.handleChangePoints(event)}
              min="0"
              max="10"
            ></input>
          </div>
          <Button
            className="button-send"
            onClick={() => this.addQuestionAndAnswers()}
          >
            Send to Redis
          </Button>
          <Button
            className="button-cancel"
            onClick={() => this.buttonCancelClicked()}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
  handleChangePoints(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({points:parseInt(event.target.value)})
  }
  async sendToRedisAndPublish(): Promise<void> {
    await this.publish(this.state.stringKeyToReturn.toString());
  }
  async publish(messageToPublish: string): Promise<any> {
    await fetch(redisPublishURL, {
      method: POST,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(messageToPublish)
    }).then(response => {
      console.log("Zdrawwwo publishowwwan sam");
    });
  }
  async addQuestionAndAnswers(): Promise<void> {
    await this.addQuestion(this.state.questionInput);
    await this.publish(this.state.stringKeyToReturn);
    await this.sendMessage();

   
  }

  handleChangeAnswerA(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ answerAInput: event.target.value });
  }
  handleChangeAnswerB(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ answerBInput: event.target.value });
  }
  handleChangeAnswerC(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ answerCInput: event.target.value });
  }
  handleChangeAnswerD(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ answerDInput: event.target.value });
  }
  
  buttonCancelClicked(): void {
    this.setState({ questionInput: emptyString });
    this.setState({ answerAInput: emptyString });
    this.setState({ answerBInput: emptyString });
    this.setState({ answerCInput: emptyString });
    this.setState({ answerDInput: emptyString });
  }
  handleChangeQuestion(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({ questionInput: event.target.value });
  }
  async addQuestion(questionText: string): Promise<any> {
    let generatedIdForQuestion: string = ID();
    await fetch(redisQuestionUR, {
      method: POST,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        questionId: generatedIdForQuestion,
        questionText: questionText,
        answerA: this.state.answerAInput,
        answerB: this.state.answerBInput,
        answerC: this.state.answerCInput,
        answerD: this.state.answerDInput,
        points: this.state.points,
        active: False
      })
    }).then(response => {
      response.json().then(data => {
        this.setState({ stringKeyToReturn: data });
        this.handleChangeQuestionINSTANCE(questionText, generatedIdForQuestion);
        console.log(this.state.stringKeyToReturn);
      });
    });
  }
  handleChangeQuestionINSTANCE(
    questionText: string,
    generatedIdForQuestion: string
  ) {
    let q: Question = new Question(
      generatedIdForQuestion,
      questionText,
      this.state.answerAInput,
      this.state.answerBInput,
      this.state.answerCInput,
      this.state.answerDInput,
      this.state.points,
      False
    );
    this.setState({ question: q });
    this.questions.push(q);
  }
  async getQuestions(): Promise<Question[]> {
    let response = await fetch(redisQuestionUR).catch(err => {
      return err;
    });
    let data = response.json();
    return data;
  }
}
export default Questions;
