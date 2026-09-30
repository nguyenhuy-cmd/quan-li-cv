import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { ResponseMessage } from '../decorators/customize.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ResponseMessage("Thêm user")
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    return {
      id: newUser.id
    }
  }

  @ResponseMessage("Lấy danh sách tất cả user")
  @Get()
  async findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query('q') qs: string
  ) {
    return await this.usersService.findAll(currentPage, limit, qs);
  }

  @ResponseMessage("Xem 1 thành viên bằng id")
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return  await this.usersService.findOne(+id);
  }

  @ResponseMessage("Cập nhập thông tin tài khoản")
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @ResponseMessage("Xóa tài khoản")
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
