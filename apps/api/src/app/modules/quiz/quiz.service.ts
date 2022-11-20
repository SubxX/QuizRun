import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuizDto } from './dto/quiz.dto';
import { Quiz, QuizDocument } from './schema/quiz.schema';

@Injectable()
export class QuizService {

  constructor(
    @InjectModel(Quiz.name) private readonly userModel: Model<QuizDocument>
  ) { }

  async create(payload: CreateQuizDto) {
    return payload
  }
}
