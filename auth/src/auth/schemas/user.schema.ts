import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from '../../roles/roles.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    enum: [Role.USER, Role.OPERATOR, Role.AUDITOR, Role.ADMIN],
    default: Role.USER,
  })
  role: Role;

  @Prop()
  refreshToken?: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: 0 })
  point: number;

  @Prop({ required: false })
  reference: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
