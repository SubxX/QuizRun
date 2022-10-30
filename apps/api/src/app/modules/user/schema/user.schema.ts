import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, default: 'STUDENT' })
    role: string;

    @Prop({ default: null })
    profile_picture: string;
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)