import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './schema/quiz.schema';
import { QuizService } from './quiz.service';
import { OrganizationQuizController, QuizController } from './quiz.controller';
import { QuestionSchema, Question } from './schema/question.schema';
import { UserModule } from '../user/user.module';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: Question.name, schema: QuestionSchema }
    ]),
    UserModule,
    OrganizationModule
  ],
  controllers: [
    QuizController,
    OrganizationQuizController
  ],
  providers: [QuizService],
})
export class QuizModule { }
