export class CreateUserDto {
    email: string;
    name: string;
    profile_picture?: string
    password: string
    organizations?: string[]
    favourite_organizations?: string[]
}