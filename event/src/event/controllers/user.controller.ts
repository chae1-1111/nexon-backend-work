import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getEventList(@Req() req) {
    return this.userService.getUserInfo(req.headers['x-user-id']);
  }
}
