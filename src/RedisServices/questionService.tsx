import {Player} from "../Models/Model";
import axios from 'axios';

axios.defaults.timeout = 180000;

const redisQuestionURL="https://localhost:6379/api/question"
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

export const getQuestion=(): Promise<Question[]> =>(
    axios.get<Question[]>(redisQuestionURL).then(res =>res.data).catch(err=>{throw err})
);