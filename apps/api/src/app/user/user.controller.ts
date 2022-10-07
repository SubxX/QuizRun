import { Request, Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@api/app/guard/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtGuard)
  @Get('me')
  async test(@Request() req) {
    return req.user
  }
}
