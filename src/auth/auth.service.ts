import { RegisterUserDto } from '../users/dto/create-user.dto.js';
import { UsersService } from '../users/users.service.js';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { LoginUserDto } from '../users/entities/user.entity.js';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private readonly jwtService: JwtService) { }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }
    const isPasswordValid = compareSync(loginUserDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    // Thông tin đính kèm vào payload của token (không nên chứa mật khẩu)
    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(registerUserDto: RegisterUserDto) {
    const newUser = await this.usersService.register(registerUserDto);
    return {
      id: newUser.id,
      email: newUser.email,
      full_name: newUser.Full_name,
      role: newUser.role,
    }
  }
}
