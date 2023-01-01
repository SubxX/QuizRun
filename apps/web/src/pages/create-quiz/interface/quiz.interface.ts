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
    questions: IQuestion[];
};