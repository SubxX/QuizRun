import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentils: LoginDto) {
    return this.authService.login(credentils)
  }

  @Post('login-department')
  @HttpCode(HttpStatus.OK)
  async departmentLogin(@Body() credentils: LoginDto) {
    return this.authService.departmentLogin(credentils)
  }
}
