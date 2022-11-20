import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Department } from "../../department/schema/department.schema";
import { Organization } from "../../organization/schema/organization.schema";
import { Question } from "./question.schema";

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ required: true })
  name: string;

  @Prop({ default: false })
  active: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organization_id: Organization;

  @Prop({ type: Types.ObjectId, ref: 'Department', required: true })
  department_id: Department;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Question' }] })
  questions: Question[];
}

export type QuizDocument = Quiz & Document
export const QuizSchema = SchemaFactory.createForClass(Quiz)
