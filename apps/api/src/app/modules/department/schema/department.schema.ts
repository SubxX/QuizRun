import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Department {
  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  icon: string;

  @Prop({ required: true })
  description: string;
}

export type DepartmentDocument = Department & Document
export const DepartmentSchema = SchemaFactory.createForClass(Department)
