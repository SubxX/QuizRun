import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './schema/quiz.schema';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { QuestionSchema, Question } from './schema/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: Question.name, schema: QuestionSchema }
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule { }
