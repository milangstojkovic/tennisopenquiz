import React, { Component } from "react";
interface IState {}
export type Props = {
  questionText: string;
  questionId: string;
  active: boolean;
  answersArray: Answer[];
};
class Answer {
  constructor(
    public answerId: string,
    public answerText: string,
    public points: number,
    public questionId: string
  ) {}
}
class QuestionAnswers extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props.answersArray);
    return (
      <div className="div-question-answers">
        <h3>{this.props.questionText}</h3>
        <div className="div-answers">
          {this.props.answersArray.map((element, index) => (
            <label key={index}>{element.answerText}</label>
          ))}
        </div>
      </div>
    );
  }
}
export default QuestionAnswers;
