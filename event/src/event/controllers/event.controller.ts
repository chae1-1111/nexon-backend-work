import { Body, Controller, Get, Patch, Post, Query, Req } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { GetEventListDto } from '../dto/get-event-list.dto';
import { UpdateRewardListDto } from '../dto/update-reward-list.dto';
import { RequestEventRewardDto } from '../dto/request-event-reward.dto';
import { GetCompleteEventListDto } from '../dto/get-complete-event-list.dto';
import { Role } from '../../roles/roles.enum';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/')
  async create(@Req() req, @Body() dto: CreateEventDto) {
    return this.eventService.createEvent(dto, req.headers['x-user-id']);
  }

  @Get('/')
  async getEventList(@Query() dto: GetEventListDto) {
    return this.eventService.getEventList(dto);
  }

  @Get('/detail')
  async getEvent(@Query('id') id: string) {
    return this.eventService.getEvent(id);
  }

  @Patch('/reward')
  async updateRewardList(@Body() dto: UpdateRewardListDto) {
    return this.eventService.updateRewardList(dto);
  }

  @Post('/complete')
  async completeEvent(@Req() req, @Body() dto: RequestEventRewardDto) {
    return this.eventService.requestEventReward(dto, req.headers['x-user-id']);
  }

  @Get('/complete')
  async getCompleteEventList(
    @Req() req,
    @Query() dto: GetCompleteEventListDto,
  ) {
    const targetUserId =
      req.headers['x-user-id'] === Role.USER
        ? req.headers['x-user-id']
        : dto.userId;
    return this.eventService.getCompleteEventList(dto.page, targetUserId);
  }
}
