import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './router/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { RolesGuard } from './auth/roles.guard';
import { HttpModule } from '@nestjs/axios';
import { EventController } from './router/event.controller';
import { JwtRefreshStrategy } from './auth/jwt-refresh.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    HttpModule,
  ],
  controllers: [AuthController, EventController],
  providers: [JwtStrategy, JwtRefreshStrategy, RolesGuard],
})
export class AppModule {}
