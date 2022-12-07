import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Organization } from "../../organization/schema/organization.schema";

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, select: false })
    password: string;

    @Prop({ default: null })
    profile_picture: string;

    @Prop({ type: Types.ObjectId, ref: 'Organization' }) // for users own organization
    my_organization: Organization;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Organization' }] }) // Fav organization list
    favourite_organizations: Organization[];
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)