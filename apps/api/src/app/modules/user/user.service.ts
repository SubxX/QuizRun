import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/user.dto';
import { UserDetails } from './interface/user.interface';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
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

    async create(userPayload: CreateUserDto) {
        const newUser = new this.userModel(userPayload)
        return newUser.save()
    }

    async findByEmail(email: string) {
        return this.userModel.findOne({ email })
    }

    async findById(id: string) {
        const user = await this.userModel.findById(id)
        if (!user) return null
        return this._getUserDetails(user)
    }
}
