export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    score: number;
}


export interface Player {
    name: string;
    surname: string;
    score: number;
    ranking: number;
    country:string;
    birthdate: string;
}

export interface Tournament {
    name: string;
    date: string;
    surface: string;
}

export interface Match {
    matchid: string;
    tournamentName: string;
    player1: string;
    player2: string;
    date: string;
    isFinished: boolean;
}

export interface Statistic {
    matchid: string;
    player1Aces: number;
    player2Aces: number;
    player1DoubleFaults: number;
    player2DoubleFaults: number;
    player1UnforcedErrors: number;
    player2UnforcedErrors: number;
    player1TotalPoints: number;
    player2TotalPoints: number;

}

export interface Winner {
    player1ForehandWinners: number;
    player1BackhandWinners: number;
    player1TotalWinners: number;
    player2ForehandWinners: number;
    player2BackhandWinners: number;
    player2TotalWinners: number;
}

export interface BreakPt {
    player1BreakPtAtt: number;
    player1BreakPtWon: number;
    player2BreakPtAtt: number;
    player2BreakPtWon: number;
}

export interface Set {
    setNo: number;
    player1GamesWon: number;
    player2GamesWon: number;
}

export interface Game {
    player1Points: number;
    player2Points: number;
}

export interface Question {
    id: string;
    text: string;
    active: boolean;
    answers: [Answer];
}

export interface Answer {
    id: string;
    questionId: string;
    text: string;
    isCorrect: boolean;
    points: number;
}

export interface QuesAns {
    questionId: string;
    answerId: string;
    userId: string;
}