import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reward, RewardDocument } from '../schemas/reward.schema';
import { CreateRewardDto } from '../dto/create-reward.dto';
import { GetRewardListDto } from '../dto/get-reward-list.dto';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel(Reward.name) private rewardModel: Model<RewardDocument>,
  ) {}

  async createReward(dto: CreateRewardDto, creatorId: string) {
    console.log(`creatorId: ${creatorId}`);
    const event = new this.rewardModel({
      type: dto.type,
      amount: dto.amount,
      itemId: dto.itemId ? new Types.ObjectId(dto.itemId) : undefined,
      createdBy: new Types.ObjectId(creatorId),
    });
    return event.save();
  }

  async getRewardList(dto: GetRewardListDto) {
    return this.rewardModel
      .find({})
      .skip(((dto.page ?? 1) - 1) * 10)
      .limit(10);
  }

  async getReward(id: string) {
    console.log(id);
    const _id = new Types.ObjectId(id);
    return this.rewardModel.findById(_id);
  }
}
