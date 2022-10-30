import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from '@api/app/modules/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() createUserPayload: CreateUserDto) {
    return this.authService.register(createUserPayload)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentils: LoginDto) {
    return this.authService.login(credentils)
  }
}
