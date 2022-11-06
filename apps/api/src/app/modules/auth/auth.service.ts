import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@api/app/modules/user/dto/user.dto';
import { UserService } from '@api/app/modules/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '@api/app/shared/bcrypt.service';
import { OrganizationService } from '../organization/organization.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private organizationService: OrganizationService,
    private readonly bcrypt: BcryptService
  ) { }

  async login(credentials: LoginDto) {
    const user = await this.userService.findByEmail(credentials.email)
    if (!user) throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Invalid credentials" }, HttpStatus.BAD_REQUEST)

    const isPasswordCorrect = await this.bcrypt.matchPassword(credentials.password, user.password)
    if (!isPasswordCorrect) throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Invalid credentials" }, HttpStatus.BAD_REQUEST)

    const jwtToken = await this.jwtService.signAsync({ _id: user.id, email: user.email })
    return { token: jwtToken }
  }

  async departmentLogin(credentials: LoginDto) {
    const org = await this.organizationService.findByEmail(credentials.email)
    if (!org) throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Invalid credentials" }, HttpStatus.BAD_REQUEST)

    const isPasswordCorrect = await this.bcrypt.matchPassword(credentials.password, org.password)
    if (!isPasswordCorrect) throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Invalid credentials" }, HttpStatus.BAD_REQUEST)

    const jwtToken = await this.jwtService.signAsync({ _id: org.id, email: org.email })
    return { token: jwtToken }
  }
}
