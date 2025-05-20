import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestDocument = Quest & Document;

@Schema({ timestamps: true })
export class Quest {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, default: '' })
  description: string;
}

export const QuestSchema = SchemaFactory.createForClass(Quest);
