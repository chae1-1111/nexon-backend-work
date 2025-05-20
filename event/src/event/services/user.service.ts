import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async getUserInfo(userId: string) {
    const _userId = new Types.ObjectId(userId);

    const user = await this.userModel.findById(_userId);

    return user
      ? {
          userId: user.userId,
          name: user.name,
          role: user.role,
          point: user.point,
        }
      : {};
  }
}
