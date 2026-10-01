import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';

import { JwtStrategy } from './jwt.strategy.js';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY', // Khuyến nghị đưa vào file .env qua ConfigService
      signOptions: { expiresIn: '1d' }, // Token hết hạn sau 1 ngày (ví dụ: '60s', '1h', '7d')
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
