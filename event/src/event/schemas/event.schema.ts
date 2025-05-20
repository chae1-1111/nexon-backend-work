import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EventType } from '../enums/event-type.enum';
import { EventStatus } from '../enums/event-status.enum';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({
    required: true,
    enum: [EventType.ATTENDANCE, EventType.INVITING, EventType.QUEST],
  })
  type: EventType;

  @Prop()
  count?: number;

  @Prop()
  questId?: Types.ObjectId;

  @Prop({
    required: false,
    default: [],
  })
  rewards: Types.ObjectId[];

  @Prop({
    required: true,
    enum: [EventStatus.ACTIVE, EventStatus.INACTIVE],
    default: EventStatus.ACTIVE,
  })
  status: EventStatus;

  @Prop({
    required: true,
  })
  createdBy: Types.ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(Event);
