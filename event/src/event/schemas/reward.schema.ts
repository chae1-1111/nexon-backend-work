import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RewardType } from '../enums/reward-type.enum';

export type RewardDocument = Reward & Document;

@Schema({ timestamps: true })
export class Reward {
  @Prop({ required: true, enum: [RewardType.POINT, RewardType.ITEM] })
  type: RewardType;

  @Prop({ required: true })
  amount: number;

  /* Reward.type 이 ITEM 인 경우 필수값 */
  @Prop({ required: false })
  itemId: Types.ObjectId;

  @Prop({
    required: true,
  })
  createdBy: Types.ObjectId;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
