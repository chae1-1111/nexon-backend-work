import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReferenceDocument = Reference & Document;

@Schema({ timestamps: true })
export class Reference {
  @Prop({ required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  reference: Types.ObjectId;

  @Prop({ required: true, default: false })
  rewardGiven: boolean;
}

export const ReferenceSchema = SchemaFactory.createForClass(Reference);
