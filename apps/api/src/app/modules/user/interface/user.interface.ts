import { CreateUserDto } from "../dto/user.dto";

export type UserDetails = Omit<CreateUserDto, 'password'> & { _id: string }