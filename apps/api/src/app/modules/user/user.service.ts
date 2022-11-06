import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/user.dto';
import { UserDetails } from './interface/user.interface';
import { BcryptService } from '@api/app/shared/bcrypt.service';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private bcrypt: BcryptService
  ) { }

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      profile_picture: user.profile_picture,
      role: user.role
    }
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email })
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id)
    if (!user) return null
    return this._getUserDetails(user)
  }

  async register(user: CreateUserDto) {
    const existingUser = await this.findByEmail(user.email)
    if (existingUser) {
      throw new HttpException({ status: HttpStatus.CONFLICT, error: 'User already exists' }, HttpStatus.CONFLICT);
    }
    const hashedPassword = await this.bcrypt.hashPassword(user.password)

    const newUser = new this.userModel({ ...user, password: hashedPassword })
    await newUser.save()
    return this._getUserDetails(newUser)
  }
}
