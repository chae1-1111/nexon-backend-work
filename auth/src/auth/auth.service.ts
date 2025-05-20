import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { SignupDto } from './dto/signup.dto';
import { Role } from '../roles/roles.enum';
import { Reference, ReferenceDocument } from './schemas/reference.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Reference.name)
    private referenceModel: Model<ReferenceDocument>,
  ) {}

  // 초기 데이터 생성
  async onModuleInit() {
    const adminUsers = await this.userModel.find({
      role: Role.ADMIN,
    });

    if (adminUsers.length === 0) {
      await this.userModel.insertOne({
        userId: 'admin',
        password: 'password',
        role: Role.ADMIN,
        name: '관리자',
      });
    }
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.userId, dto.password);
    if (!user) {
      return {};
    }

    const accessToken = this.generateAccessToken({
      sub: user._id,
      role: user.role,
    });
    const refreshToken = this.generateRefreshToken({ sub: user._id });

    await this.updateRefreshToken(user._id, refreshToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async signUp(dto: SignupDto) {
    const referenceId = dto.reference
      ? new Types.ObjectId(dto.reference)
      : undefined;
    const user = new this.userModel({
      userId: dto.userId,
      password: dto.password,
      name: dto.name,
      reference: referenceId,
    });
    const result = await user.save();

    if (referenceId) {
      await this.referenceModel.insertOne({
        userId: result._id,
        reference: referenceId,
      });
    }

    return result;
  }

  async refreshToken(authorization: string) {
    if (!authorization.includes('Bearer ')) return {};

    const refreshToken = authorization.split(' ')[1];

    const user = await this.userModel.findOne({
      refreshToken: refreshToken,
    });

    if (!user) return {};

    const newAccessToken = this.generateAccessToken({
      sub: user._id,
      role: user.role,
    });
    const newRefreshToken = this.generateRefreshToken({ sub: user._id });

    await this.updateRefreshToken(user._id, newRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async validateUser(userId: string, password: string) {
    const user = await this.userModel.findOne({
      userId: userId,
      password: password,
    });

    return user
      ? {
          _id: user._id,
          role: user.role,
        }
      : null;
  }

  async updateRefreshToken(_id: any, newRefreshToken: string) {
    return this.userModel.updateOne({ _id }, { refreshToken: newRefreshToken });
  }

  // Access Token 발급
  generateAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
  }

  // Refresh Token 발급
  generateRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
  }
}
