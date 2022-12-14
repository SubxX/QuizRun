import { Request, Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { JwtGuard } from '@api/app/guard/jwt.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtGuard)
  @Get('me')
  async getLoggedInUserInfo(@Request() req) {
    return this.userService.findById(req?.user?._id)
  }

  @Post('register')
  async register(@Body() payload: CreateUserDto) {
    return this.userService.register(payload)
  }
}
