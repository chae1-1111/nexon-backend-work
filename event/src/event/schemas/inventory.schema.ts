import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InventoryDocument = Inventory & Document;

@Schema({ timestamps: true })
export class Inventory {
  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  itemId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);

InventorySchema.index({ userId: 1, itemId: 1 }, { unique: true });
