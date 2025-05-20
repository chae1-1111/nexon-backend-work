import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event, EventDocument } from '../schemas/event.schema';
import {
  EventHistory,
  EventHistoryDocument,
} from '../schemas/event-history.schema';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventStatus } from '../enums/event-status.enum';
import { GetEventListDto } from '../dto/get-event-list.dto';
import { UpdateRewardListDto } from '../dto/update-reward-list.dto';
import { RequestEventRewardDto } from '../dto/request-event-reward.dto';
import { EventType } from '../enums/event-type.enum';
import { Attendance, AttendanceDocument } from '../schemas/attendance.schema';
import { Reward, RewardDocument } from '../schemas/reward.schema';
import { RewardType } from '../enums/reward-type.enum';
import { User, UserDocument } from '../schemas/user.schema';
import { Inventory, InventoryDocument } from '../schemas/inventory.schema';
import { EventHistoryStatus } from '../enums/event-history-status.enum';
import {
  QuestHistory,
  QuestHistoryDocument,
} from '../schemas/quest-history.schema';
import {Reference, ReferenceDocument} from "../schemas/reference.schema";

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(EventHistory.name)
    private eventHistoryModel: Model<EventHistoryDocument>,
    @InjectModel(Attendance.name)
    private attendanceModel: Model<AttendanceDocument>,
    @InjectModel(Reward.name)
    private rewardModel: Model<RewardDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Inventory.name)
    private inventoryModel: Model<InventoryDocument>,
    @InjectModel(Reference.name)
    private referenceModel: Model<ReferenceDocument>,
    @InjectModel(QuestHistory.name)
    private questHistoryModel: Model<QuestHistoryDocument>,
  ) {}

  /* 이벤트 생성 */
  async createEvent(dto: CreateEventDto, creatorId: string) {
    const event = new this.eventModel({
      title: dto.title,
      description: dto.description,
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
      type: dto.type,
      count: dto.count,
      questId: new Types.ObjectId(dto.questId),
      status: dto.isActive ? EventStatus.ACTIVE : EventStatus.INACTIVE,
      createdBy: creatorId,
    });
    return event.save();
  }

  async getEventList(dto: GetEventListDto) {
    const eventList = await this.eventModel
      .find({})
      .skip(((dto.page ?? 1) - 1) * 10)
      .limit(10);
    return eventList;
  }

  async getEvent(id: string) {
    const _id = new Types.ObjectId(id);
    const event = await this.eventModel.findById(_id);
    return event;
  }

  async updateRewardList(dto: UpdateRewardListDto) {
    const _id = new Types.ObjectId(dto.eventId);
    const newRewardList = dto.rewardList.map(
      (rewardIdStr) => new Types.ObjectId(rewardIdStr),
    );
    return this.eventModel.updateOne(
      { _id },
      {
        rewards: newRewardList,
      },
    );
  }

  async requestEventReward(dto: RequestEventRewardDto, userId: string) {
    const _userId = new Types.ObjectId(userId);

    const event = await this.eventModel.findById(
      new Types.ObjectId(dto.eventId),
    );

    if (!event) return {};

    let isQualifiedForReward: boolean = false;

    switch (event.type) {
      case EventType.ATTENDANCE:
        // 이벤트 기간 내 출석 일수 검증
        const attendanceList = await this.attendanceModel.find({
          userId: _userId,
          createdAt: {
            $gte: event.startTime,
            $lte: event.endTime,
          },
        });
        isQualifiedForReward =
          event.count != null && attendanceList.length >= event.count;
        break;
      case EventType.INVITING:
        // 이벤트 기간 내 친구 초대 횟수 검증
        const invitingHistory = await this.referenceModel.find({
          reference: _userId,
          createdAt: {
            $gte: event.startTime,
            $lte: event.endTime,
          },
        });
        isQualifiedForReward =
          event.count != null && invitingHistory.length >= event.count;
        break;
      case EventType.QUEST:
        // 이벤트 기간 내 퀘스트 달성 여부 검증
        const questHistory = await this.questHistoryModel.findOne({
          userId: _userId,
          questId: event.questId,
          createdAt: {
            $gte: event.startTime,
            $lte: event.endTime,
          },
        });
        isQualifiedForReward = questHistory != null;
        break;
    }

    if (isQualifiedForReward) {
      // 리워드 지급
      try {
        for (const rewardId of event.rewards) {
          const reward = await this.rewardModel.findById(rewardId);

          if (!reward) continue;

          switch (reward.type) {
            case RewardType.POINT:
              await this.userModel.updateOne(
                { _id: _userId },
                { $inc: { point: reward.amount } },
              );
              break;
            case RewardType.ITEM:
              await this.inventoryModel.updateOne(
                {
                  userId: _userId,
                  itemId: reward.itemId,
                },
                {
                  $inc: { amount: reward.amount },
                },
                { upsert: true },
              );
          }
        }

        await this.eventHistoryModel.insertOne({
          eventId: event._id,
          userId: _userId,
          reward: event.rewards,
          result: EventHistoryStatus.SUCCESS,
        });
      } catch (err: any) {
        console.error(err);
        await this.eventHistoryModel.insertOne({
          eventId: event._id,
          userId: _userId,
          reward: [],
          result: EventHistoryStatus.FAIL,
        });
        return {};
      }
    }
  }

  async getCompleteEventList(page?: number, userId?: string) {
    const _userId = userId ? new Types.ObjectId(userId) : undefined;

    return this.eventHistoryModel
      .find(_userId ? { userId: _userId } : {})
      .skip(((page ?? 1) - 1) * 10)
      .limit(10);
  }
}
