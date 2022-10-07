import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Department } from "./department.schema";

@Schema({ timestamps: true })
export class Organization {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: null })
    website: string;

    @Prop({ required: true })
    information: string;

    @Prop({ required: true })
    address: string;

    @Prop({ default: null })
    logo: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Department' }] })
    departments: Department[];
}

export type OrganizationDocument = Organization & Document
export const OrganizationSchema = SchemaFactory.createForClass(Organization)