export class CreateUserDto {
    email: string;
    name: string;
    profile_picture?: string
    password: string
    role?: string
}