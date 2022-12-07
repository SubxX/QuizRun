import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Department } from "../../department/schema/department.schema";
import { Organization } from "../../organization/schema/organization.schema";
import { User } from "../../user/schema/user.schema";
import { Question } from "./question.schema";

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ required: true })
  name: string;

  @Prop({ default: false })
  active: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organization: Organization;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  created_by: User;

  @Prop({ type: Types.ObjectId, ref: 'Department', required: true })
  department: Department;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Question' }], default: [] })
  questions: Question[];
}

export type QuizDocument = Quiz & Document
export const QuizSchema = SchemaFactory.createForClass(Quiz)
