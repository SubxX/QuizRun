import { Controller, UseGuards, Post, Body, Request, HttpStatus, HttpCode, Get, Param } from '@nestjs/common';
import { JwtGuard } from '@api/app/guard/jwt.guard';
import { CreateQuizDto, AddQuestionToQuizDto } from './dto/quiz.dto';
import { QuizService } from './quiz.service';
import { TeacherGuard } from '@api/app/guard/teacher.guard';
import { GuardType as Check } from '@api/app/decorator/guard-type.decorator';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) { }

  @Get('all')
  async getALlQuizes() {
    return this.quizService.getAllQuizes()
  }
}

// Organization specific quiz realted apis
@Controller('organization/:orgId/quiz')
export class OrganizationQuizController {

  constructor(private readonly quizService: QuizService) { }


  @HttpCode(HttpStatus.CREATED)
  @Check('TEACHER')
  @UseGuards(JwtGuard, TeacherGuard)
  @Post()
  async create(@Param('orgId') organization, @Request() req, @Body() payload: CreateQuizDto) {
    return this.quizService.create({ ...payload, created_by: req.user._id, organization })
  }


  @HttpCode(HttpStatus.CREATED)
  @Check('TEACHER', 'QUIZ_OWNER')
  @UseGuards(JwtGuard, TeacherGuard)
  @Post(':quizId/add-question')
  async addQuestion(@Param('quizId') quiz_id, @Body() payload: AddQuestionToQuizDto) {
    return this.quizService.addQuestion({ ...payload, quiz_id })
  }
}