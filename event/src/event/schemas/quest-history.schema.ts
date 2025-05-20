import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuestHistoryDocument = QuestHistory & Document;

@Schema({ timestamps: true })
export class QuestHistory {
  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  questId: Types.ObjectId;
}

export const QuestHistorySchema = SchemaFactory.createForClass(QuestHistory);
