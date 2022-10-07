import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@api/app/user/dto/user.dto';
import { UserService } from '@api/app/user/user.service';
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

    async register(user: CreateUserDto) {
        const existingUser = await this.userService.findByEmail(user.email)
        if (existingUser) {
            throw new HttpException({ status: HttpStatus.CONFLICT, error: 'User already exists' }, HttpStatus.CONFLICT);
        }
        const hashedPassword = await this.bcrypt.hashPassword(user.password)
        const newUser = await this.userService.create({ ...user, password: hashedPassword })
        return this.userService._getUserDetails(newUser)
    }

    async login(credentials: LoginDto) {
        const user = await this.userService.findByEmail(credentials.email)
        if (!user) throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Invalid credentials" }, HttpStatus.BAD_REQUEST)

        const isPasswordCorrect = await this.bcrypt.matchPassword(credentials.password, user.password)
        if (!isPasswordCorrect) throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Invalid credentials" }, HttpStatus.BAD_REQUEST)

        const userData = this.userService._getUserDetails(user)
        const jwtToken = await this.jwtService.signAsync(userData)
        return { token: jwtToken }
    }
}
