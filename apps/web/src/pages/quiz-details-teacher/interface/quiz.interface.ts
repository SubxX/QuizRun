export type IAnswer = {
    isCorrect: boolean;
    value: string;
};

export type IQuestion = {
    name: string;
    description?: string;
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