import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '@api/app/modules/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '@api/app/shared/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly bcrypt: BcryptService
  ) { }

  async login(credentials: LoginDto) {
    const user = await this.userService.findByEmail(credentials.email, { password: 1, email: 1 })
    if (!user) throw new HttpException({ error: "Invalid credentials" }, HttpStatus.BAD_REQUEST)

    const isPasswordCorrect = await this.bcrypt.matchPassword(credentials.password, user.password)
    if (!isPasswordCorrect) throw new HttpException({ error: "Invalid credentials" }, HttpStatus.BAD_REQUEST)

    const jwtToken = await this.jwtService.signAsync({ _id: user.id, email: user.email })
    return { token: jwtToken }
  }
}
