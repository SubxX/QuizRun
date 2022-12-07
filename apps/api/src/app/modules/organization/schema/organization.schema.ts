import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Department } from "../../department/schema/department.schema";
import { User } from "../../user/schema/user.schema";

@Schema({ timestamps: true })
export class Organization {
    @Prop({ required: true })
    name: string;

    @Prop({ default: null })
    website: string;

    @Prop({ required: true })
    information: string;

    @Prop({ required: true })
    address: string;

    @Prop({ default: null })
    logo: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    created_by: User;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Department' }] })
    departments: Department[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
    teachers: User[];
}

export type OrganizationDocument = Organization & Document
export const OrganizationSchema = SchemaFactory.createForClass(Organization)
