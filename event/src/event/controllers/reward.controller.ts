import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { RewardService } from '../services/reward.service';
import { CreateRewardDto } from '../dto/create-reward.dto';
import { GetRewardListDto } from '../dto/get-reward-list.dto';

@Controller('/reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post('/')
  async createReward(@Req() req, @Body() dto: CreateRewardDto) {
    console.log(`headers : ${JSON.stringify(req.headers)}`);
    return this.rewardService.createReward(dto, req.headers['x-user-id']);
  }

  @Get('/')
  async getRewardList(@Query() dto: GetRewardListDto) {
    return this.rewardService.getRewardList(dto);
  }

  @Get('/detail')
  async getReward(@Query('id') id: string) {
    return this.rewardService.getReward(id);
  }
}
