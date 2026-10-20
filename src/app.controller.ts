import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Health check / trang chủ API' })
  root() {
    return {
      name: 'quan-li-cv API',
      status: 'ok',
      endpoints: ['/auth', '/users', '/projects', '/tasks', '/comments'],
      docs: '/docs',
    };
  }
}
