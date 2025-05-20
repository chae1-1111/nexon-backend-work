import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EventHistoryStatus } from '../enums/event-history-status.enum';

export type EventHistoryDocument = EventHistory & Document;

@Schema({ timestamps: true })
export class EventHistory {
  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  eventId: Types.ObjectId;

  @Prop({ required: true, default: [] })
  reward: Types.ObjectId[];

  @Prop({
    required: true,
    enum: [EventHistoryStatus.SUCCESS, EventHistoryStatus.FAIL],
  })
  result: EventHistoryStatus;
}

export const EventHistorySchema = SchemaFactory.createForClass(EventHistory);
