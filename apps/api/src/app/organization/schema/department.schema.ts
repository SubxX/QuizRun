import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Organization } from "./organization.schema";

@Schema({ timestamps: true })
export class Department {
    @Prop({ required: true })
    name: string;

    @Prop({ default: null })
    icon: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'Organization' })
    organization: Organization;
}

export type DepartmentDocument = Department & Document
export const DepartmentSchema = SchemaFactory.createForClass(Department)