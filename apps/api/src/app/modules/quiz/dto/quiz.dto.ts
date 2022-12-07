
export class CreateQuizDto {
  name: string;
  department: string;
  created_by?: string
  organization: string
}

export class AddQuestionToQuizDto {
  title: string;
  subtitle?: string;
  content?: string;
  hint?: string;
  correctAnswer: number;
  options: any[]
  point: number
  quiz_id: string;
}