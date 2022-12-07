import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/user.dto';
import { BcryptService } from '@api/app/shared/bcrypt.service';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private bcrypt: BcryptService
  ) { }

  async findByEmail(email: string, projection?: ProjectionType<UserDocument>) {
    return this.userModel.findOne({ email }, projection)
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id)
    if (!user) throw new HttpException({ error: 'User not found' }, HttpStatus.NOT_FOUND)
    return user
  }

  async register(user: CreateUserDto) {
    const existingUser = await this.findByEmail(user.email)
    if (existingUser) {
      throw new HttpException({ error: 'User already exists' }, HttpStatus.CONFLICT);
    }
    const hashedPassword = await this.bcrypt.hashPassword(user.password)

    const newUser = new this.userModel({ ...user, password: hashedPassword })
    await newUser.save()
    return { message: "Registrtion succesfull!" }
  }
}
