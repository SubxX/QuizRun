import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Quiz } from "./quiz.schema";

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  subtitle: string;

  @Prop({ default: null })
  content: string;

  @Prop({ default: null })
  hint: string;

  @Prop({ default: [] })
  options: any[]

  @Prop({ default: 0 })
  point: number

  @Prop({ type: Types.ObjectId, ref: 'Quiz', required: true })
  quiz_id: Quiz;
}

export type QuestionDocument = Question & Document
export const QuestionSchema = SchemaFactory.createForClass(Question)
