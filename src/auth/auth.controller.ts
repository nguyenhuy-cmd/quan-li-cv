
import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { ResponseMessage } from '../decorators/customize.js';
import { LoginUserDto } from '../users/entities/user.entity.js';
import { RegisterUserDto } from '../users/dto/create-user.dto.js';
``
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('login')
  @ResponseMessage("Đăng nhập thành công")
  async handleLogin(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('register')
  @ResponseMessage("Đăng kí thành công")
  async handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.register(registerUserDto)
  }
}
