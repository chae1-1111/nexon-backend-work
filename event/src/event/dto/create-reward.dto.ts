import { RewardType } from '../enums/reward-type.enum';

export class CreateRewardDto {
  type: RewardType;
  amount: number;
  itemId?: string;
}
