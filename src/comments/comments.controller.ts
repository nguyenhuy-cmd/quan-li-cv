import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { UpdateCommentDto } from './dto/update-comment.dto.js';
import { ResponseMessage } from '../decorators/customize.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('comments')

export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @UseGuards(JwtAuthGuard) // <--- Chặn ở mức Controller, bảo vệ TẤT CẢ các API bên dưới
  @ResponseMessage("Thêm bình luận thành công")
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.create(createCommentDto);
  }

  @ResponseMessage("Xem tất cả comment")
  @Get()
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query('q') qs: string
  ) {
    return this.commentsService.findAll(currentPage, limit,qs);
  }

  @ResponseMessage("Lấ chi tiết 1 comment")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard) // <--- Chặn ở mức Controller, bảo vệ TẤT CẢ các API bên dưới
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @UseGuards(JwtAuthGuard) // <--- Chặn ở mức Controller, bảo vệ TẤT CẢ các API bên dưới
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
