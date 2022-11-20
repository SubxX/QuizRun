import { Controller, UseGuards, Post, Body, Patch } from '@nestjs/common';
import { JwtGuard } from '@api/app/guard/jwt.guard';
import { CreateQuizDto } from './dto/quiz.dto';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) { }


  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() payload: CreateQuizDto) {
    return this.quizService.create(payload)
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(@Body() payload: CreateQuizDto) {
    return this.quizService.create(payload)
  }
}
