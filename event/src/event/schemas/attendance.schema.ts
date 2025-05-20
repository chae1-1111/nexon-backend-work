import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ required: true })
  userId: Types.ObjectId;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
