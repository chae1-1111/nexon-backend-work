import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { HttpService as LegacyHttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly httpService: LegacyHttpService) {}

  @Post('/login')
  async login(@Req() req) {
    const response = await firstValueFrom(
      this.httpService.post(`http://auth:3001/login`, req.body, {}),
    );
    return response.data;
  }

  @Post('/signup')
  async signUp(@Req() req) {
    const response = await firstValueFrom(
      this.httpService.post(`http://auth:3001/signup`, req.body, {}),
    );
    return response.data;
  }

  @Post('/refresh')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Req() req) {
    const response = await firstValueFrom(
      this.httpService.post(`http://auth:3001/refresh`, req.body, {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }),
    );
    return response.data;
  }
}
