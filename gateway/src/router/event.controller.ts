import {
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { HttpService as LegacyHttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('event')
export class EventController {
  constructor(private readonly httpService: LegacyHttpService) {}

  @Post('/event')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  async createEvent(@Req() req) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.post(
        `http://event:3002/event`,
        { ...req.body },
        { headers },
      ),
    );
    return response.data;
  }

  @Get('/event')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  async getEventList(@Req() req) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.get(`http://event:3002/event`, { headers }),
    );
    return response.data;
  }

  @Get('/event/detail')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  async getEvent(@Req() req, @Query('id') id: string) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.get(`http://event:3002/event/detail?id=${id}`, {
        headers,
      }),
    );
    return response.data;
  }

  @Patch('/event/reward')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  async updateRewardList(@Req() req) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.patch(
        `http://event:3002/event/reward`,
        { ...req.body },
        { headers },
      ),
    );
    return response.data;
  }

  @Post('/event/complete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  async completeEvent(@Req() req) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.post(
        `http://event:3002/event/complete`,
        { ...req.body },
        { headers },
      ),
    );
    return response.data;
  }

  @Get('/event/complete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR, Role.AUDITOR, Role.USER)
  async getCompleteEventList(@Req() req) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.get(`http://event:3002/event/complete`, {
        headers,
        params: req.query,
      }),
    );
    return response.data;
  }

  @Post('/reward')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  async createReward(@Req() req) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.post(
        `http://event:3002/reward`,
        { ...req.body },
        { headers },
      ),
    );
    return response.data;
  }

  @Get('/reward')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  async getRewardList(@Req() req) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.get(`http://event:3002/reward`, { headers }),
    );
    return response.data;
  }

  @Get('/reward/detail')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  async getReward(@Req() req, @Query('id') id: string) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.get(`http://event:3002/reward/detail?id=${id}`, {
        headers,
      }),
    );
    return response.data;
  }

  @Get('/item')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  async getItemList(@Req() req) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.get(`http://event:3002/item`, { headers }),
    );
    return response.data;
  }

  @Get('/item/detail')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  async getItem(@Req() req, @Query('id') id: string) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.get(`http://event:3002/item/detail?id=${id}`, {
        headers,
      }),
    );
    return response.data;
  }

  @Get('/quest')
  @UseGuards(JwtAuthGuard)
  async getQuestList(@Req() req) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.get(`http://event:3002/quest`, { headers }),
    );
    return response.data;
  }

  @Get('/quest/detail')
  @UseGuards(JwtAuthGuard)
  async getQuest(@Req() req, @Query('id') id: string) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.get(`http://event:3002/quest/detail?id=${id}`, {
        headers,
      }),
    );
    return response.data;
  }

  @Post('/quest/history')
  @UseGuards(JwtAuthGuard)
  async addQuestHistory(@Req() req) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.post(
        `http://event:3002/quest/history`,
        { ...req.body },
        { headers },
      ),
    );
    return response.data;
  }

  @Get('/quest/history')
  @UseGuards(JwtAuthGuard)
  async getQuestHistoryList(@Req() req) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.get(`http://event:3002/quest/history`, { headers }),
    );
    return response.data;
  }

  @Post('/attendance')
  @UseGuards(JwtAuthGuard)
  async addAttendance(@Req() req) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.post(
        `http://event:3002/attendance`,
        { ...req.body },
        { headers },
      ),
    );
    return response.data;
  }

  @Post('/inventory')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.AUDITOR)
  async addItemToInventory(@Req() req) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.post(
        `http://event:3002/inventory`,
        { ...req.body },
        { headers },
      ),
    );
    return response.data;
  }

  @Get('/inventory')
  @UseGuards(JwtAuthGuard)
  async getInventory(@Req() req) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.get(`http://event:3002/inventory`, {
        headers,
        params: req.query,
      }),
    );
    return response.data;
  }

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  async getUserData(@Req() req) {
    const headers = req.userHeaders;
    const response = await firstValueFrom(
      this.httpService.get(`http://event:3002/user`, {
        headers,
        params: req.query,
      }),
    );
    return response.data;
  }
}
