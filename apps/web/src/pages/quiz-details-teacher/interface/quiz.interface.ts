export type IAnswer = {
    value: string;
};

export type IQuestion = {
    name: string;
    description?: string;
    correctAnswer: number
    answers: IAnswer[];
};

export type IQuizForm = {
    name: string;
    description: string;
    department: string;
}

export type IQuizQuestionsForm = {
    questions: IQuestion[];
}

export interface IQuiz extends IQuizForm, IQuizQuestionsForm { }