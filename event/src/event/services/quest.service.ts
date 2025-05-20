import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Quest, QuestDocument } from '../schemas/quest.schema';
import { GetQuestListDto } from '../dto/get-quest-list.dto';
import { AddQuestHistoryDto } from '../dto/add-quest-history.dto';
import {
  QuestHistory,
  QuestHistoryDocument,
} from '../schemas/quest-history.schema';

@Injectable()
export class QuestService {
  constructor(
    @InjectModel(Quest.name) private questModel: Model<QuestDocument>,
    @InjectModel(QuestHistory.name)
    private questHistoryModel: Model<QuestHistoryDocument>,
  ) {}

  // 초기 데이터 생성
  async onModuleInit() {
    const itemCount = await this.questModel.countDocuments();

    if (itemCount === 0) {
      await this.questModel.insertMany([
        {
          title: '[현장수배] 초록버섯',
          description:
            '최근 포자언덕, 콧노래 오솔길에 출몰해서 여행자들을 방해하는 초록버섯 20마리를 수배합니다. 죄목: 통행방해, 고성방가 <추신> 초록버섯 20마리를 소탕하신 분은 버섯노래숲:포자언덕에 있는 초록버섯 수배표지판를 찾아가 제보해주세요.',
        },
        {
          title: '웃지 않는 공주',
          description:
            '머쉬킹은 버섯의 성 방문을 환영하며, 현재 연회장에서는 비올레타 공주의 신랑 겸 다음 왕위를 이을 버섯을 찾는 대회가 한창이라고 소개했다. 하지만 아쉽게도(?) 대회는 오직 버섯만이 참석 가능하다고 한다. 대신, 비올레타 공주와 대화를 할 특별한 기회를 주겠다고 하는데.',
        },
        {
          title: '기억의 나무를 되돌릴 방법',
          description:
            '플레이어가 이곳을 건너려 하자 카오는 배가 멈춰서 건널 수 없다며 자신 때문에 마을 사람과 플레이어에게 폐를 끼친다고 자책한다. 플레이어는 해결책으로 나무가 모든 일의 시작이라면 원래대로 되돌려 놓으면 될 것이라 하지만 카오는 이미 뿔뿔히 흩어진 기억을 어떻게 찾아야 할지 고민하고 촌장님께 여쭤보라고 한다.',
        },
      ]);
    }
  }

  async getQuestList(dto: GetQuestListDto) {
    return this.questModel
      .find({})
      .skip(((dto.page ?? 1) - 1) * 10)
      .limit(10);
  }

  async getQuest(id: string) {
    const _id = new Types.ObjectId(id);
    return this.questModel.findById(_id);
  }

  async addQuestHistory(dto: AddQuestHistoryDto, userId: string) {
    const _userId = new Types.ObjectId(userId);
    const _questId = new Types.ObjectId(dto.questId);

    const history = await this.questHistoryModel.findOne({
      userId: _userId,
      questId: _questId,
    });

    if (history) return {};

    return this.questHistoryModel.insertOne({
      userId: _userId,
      questId: _questId,
    });
  }

  async getQuestHistoryList(userId: string) {
    const _userId = new Types.ObjectId(userId);

    return this.questHistoryModel.find({
      userId: _userId,
    });
  }
}
