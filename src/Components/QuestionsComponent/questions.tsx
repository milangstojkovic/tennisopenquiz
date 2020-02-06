import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./questions.css";
import QuestionAnswers from "./questionAnswers";
export type Props = {};
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
  ) {}
}
interface IState {
  question: Question;
  questionInput: string;
  answerAInput: string;
  answerBInput: string;
  answerCInput: string;
  answerDInput: string;
  stringKeyToReturn: string;
}
const emptyString = "";
const False = false;
const POST = "POST";
const GET = "GET";
const PUT = "PUT";
const redisQuestionUR = "https://localhost:44379/api/question";
const redisAnswerUR = "https://localhost:44379/api/answer";
const redisPublishURL = "https://localhost:44379/api/publish";

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
      question: new Question(emptyString, emptyString, False),
      answerAInput: emptyString,
      answerBInput: emptyString,
      answerCInput: emptyString,
      answerDInput: emptyString,
      stringKeyToReturn: emptyString
    };
    this.questions = [];
    this.answers = [];
  }
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
          <button onClick={() => this.sendToRedisAndPublish()}>
            TEST SUBSCRIBE
          </button>
        </div>
        <div className="questions-answers-part">
          <div className="question-answers">
            {this.questions.map((content: Question, index: number) => (
              <QuestionAnswers
                key={index}
                questionText={content.questionText}
                questionId={content.questionId}
                active={content.active}
                answersArray={content.answers}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  async sendToRedisAndPublish(): Promise<void> {
    this.addQuestion(this.state.questionInput);
    await this.publish(this.state.stringKeyToReturn);
  }
  async publish(keyPublish: string): Promise<any> {
    await fetch(redisPublishURL, {
      method: POST,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        keyValueToPublish: keyPublish
      })
    }).then(response => {
      response.json().then(data => {
        console.log(data + "Zdrawwwo publishowwwan sam");
      });
    });
  }
  async addQuestionAndAnswers(): Promise<void> {
    await this.addQuestion(this.state.questionInput);
    if (this.state.answerAInput)
      await this.addAnswer(
        this.state.answerAInput,
        this.state.question.questionId
      );
    if (this.state.answerBInput)
      await this.addAnswer(
        this.state.answerBInput,
        this.state.question.questionId
      );
    if (this.state.answerCInput)
      await this.addAnswer(
        this.state.answerCInput,
        this.state.question.questionId
      );
    if (this.state.answerDInput)
      await this.addAnswer(
        this.state.answerDInput,
        this.state.question.questionId
      );
    let ind = this.questions.findIndex(
      el => el.questionId == this.state.question.questionId
    );
    this.questions[ind].answers = this.answers;
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
  async addQuestion(questionText: string): Promise<any>{
    let generatedIdForQuestion: string = ID();
    let stringKeyToReturnn: string = emptyString;
    await fetch(redisQuestionUR, {
      method: POST,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        questionId: generatedIdForQuestion,
        questionText: questionText
      })
    }).then(response => {
      response.json().then(async data => {
        this.setState({stringKeyToReturn:data})
        this.handleChangeQuestionINSTANCE(questionText, generatedIdForQuestion);
      });
    });
  }
  handleChangeQuestionINSTANCE(
    questionText: string,
    generatedIdForQuestion: string
  ) {
    let q: Question = new Question(generatedIdForQuestion, questionText, False);
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

  async addAnswer(answerText: string, idQuestion: string): Promise<any> {
    let idAnswer: string = ID();
    await fetch(redisAnswerUR, {
      method: POST,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        answerID: idAnswer,
        answerText: answerText,
        questionId: idQuestion
      })
    }).then(response => {
      response.json().then(data => console.log(data));
      this.answers.push(new Answer(idAnswer, answerText, 0, idQuestion));
    });
  }
}
export default Questions;
