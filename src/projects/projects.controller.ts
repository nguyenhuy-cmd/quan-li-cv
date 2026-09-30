import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { ResponseMessage } from '../decorators/customize.js';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ResponseMessage('Thêm dự án thành công')
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @ResponseMessage('Xem taats car baif vieets thanhf coong')
  @Get()
  findAll(@Query('current') currentPage: string,
      @Query('pageSize') limit: string,
      @Query('q') qs: string) {
    return this.projectsService.findAll(currentPage, limit, qs);
  }

  @ResponseMessage('Xem 1 bài viết thành công')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @ResponseMessage('Cập nhập 1 bài viết')
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @ResponseMessage('Xóa 1 bài viết')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
