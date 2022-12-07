import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType } from 'mongoose';
import { AddQuestionToQuizDto, CreateQuizDto } from './dto/quiz.dto';
import { Quiz, QuizDocument } from './schema/quiz.schema';
import { Question, QuestionDocument } from './schema/question.schema';

@Injectable()
export class QuizService {

  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<QuizDocument>,
    @InjectModel(Question.name) private readonly questionModel: Model<QuestionDocument>
  ) { }

  async getAllQuizes() {
    return this.quizModel.find({}).populate('department', { name: 1 })
  }

  async create(payload: CreateQuizDto) {
    const newQuiz = new this.quizModel(payload)
    await newQuiz.save()
    return ({ message: "Quiz created successfully!" })
  }

  async addQuestion(payload: AddQuestionToQuizDto) {
    const quiz = await this.quizModel.findById(payload.quiz_id)
    if (!quiz) throw new HttpException({ error: "No quiz found" }, HttpStatus.NOT_FOUND)

    const newQuestion = new this.questionModel(payload)
    const question = await newQuestion.save()
    quiz.questions.push(question._id)
    await quiz.save()

    return ({ message: "Question added successfully!" })
  }

  findById(quiz_id: string, projection?: ProjectionType<QuizDocument>) {
    return this.quizModel.findById(quiz_id, projection)
  }

}
