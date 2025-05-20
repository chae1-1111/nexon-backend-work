import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Attendance, AttendanceDocument } from '../schemas/attendance.schema';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private attendanceModel: Model<AttendanceDocument>,
  ) {}

  /* 이벤트 생성 */
  async createAttendance(userId: string) {
    const _userId = new Types.ObjectId(userId);

    // 이미 출석 되어있는지 조회
    const todayAttendance = await this.attendanceModel.findOne({
      userId: _userId,
      createdAt: {
        $gte: new Date().setHours(0, 0, 0, 0),
      },
    });

    // 이미 출석한 경우 출석 저장 안함
    if (todayAttendance) return {};

    const newAttendance = new this.attendanceModel({ userId: _userId });
    return newAttendance.save();
  }
}
