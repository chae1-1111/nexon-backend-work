import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { QuestService } from '../services/quest.service';
import { GetQuestListDto } from '../dto/get-quest-list.dto';
import { AddQuestHistoryDto } from '../dto/add-quest-history.dto';
import { Role } from '../../roles/roles.enum';

@Controller('quest')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @Get('/')
  async getItemList(@Query() dto: GetQuestListDto) {
    return this.questService.getQuestList(dto);
  }

  @Get('/detail')
  async getItem(@Query('id') id: string) {
    return this.questService.getQuest(id);
  }

  @Post('/history')
  async addQuestHistory(@Req() req: any, @Body() dto: AddQuestHistoryDto) {
    return this.questService.addQuestHistory(dto, req.headers['x-user-id']);
  }

  @Get('/history')
  async getQuestHistoryList(@Req() req: any, @Query() query) {
    const targetUserId =
      req.headers['x-user-role'] === Role.USER
        ? req.headers['x-user-id']
        : query['userId'];
    return this.questService.getQuestHistoryList(targetUserId);
  }
}
