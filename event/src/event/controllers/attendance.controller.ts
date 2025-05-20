import { Controller, Post, Req } from '@nestjs/common';
import { AttendanceService } from '../services/attendance.service';

@Controller('/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/')
  async createReward(@Req() req) {
    return this.attendanceService.createAttendance(req.headers['x-user-id']);
  }
}
