export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    score: number;
}


export interface Player {
    id: string;
    name: string;
    surname: string;
    score: number;
    ranking: number;
    birthDate: Date;
}

export interface Tournament {
    id: string;
    name: string;
    date: Date;
    surface: string;
}

export interface Match {
    id: string;
    tournamentId: string;
    player1Id: string;
    player2Id: string;
    date: Date;
    quizable: boolean;
}

export interface Statistic {
    matchId: string;
    player1Aces: number;
    player2Aces: number;
    player1DoubleFaults: number;
    player2DoubleFaults: number;
    player1UnforcedErrors: number;
    player2UnforcedErrors: number;
    player1TotalPoints: number;
    player2TotalPoints: number;
    winners: Winner;
    breakPts: BreakPt;
    Result: [Set];
    activeGame: Game;
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
    active: boolean;
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