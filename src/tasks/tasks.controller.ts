import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { ResponseMessage } from '../decorators/customize.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('tasks')
@UseGuards(JwtAuthGuard) // <--- Chặn ở mức Controller, bảo vệ TẤT CẢ các API bên dưới
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @ResponseMessage("Thêm công việc")
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }

  @ResponseMessage("Xem tất cả công việc thành công")
  @Get()
  async findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query('q') qs: string
  ) {
    return await this.tasksService.findAll(currentPage, limit,qs);
  }

  @ResponseMessage("Xem 1 công việc cụ thể thành công")
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tasksService.findOne(+id);
  }

  @ResponseMessage("CẠp nhập công việc thành công")
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.tasksService.update(+id, updateTaskDto);
  }

  @ResponseMessage("Xóa công việc")
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tasksService.remove(+id);
  }
}
