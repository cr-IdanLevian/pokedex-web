import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Health check for uptime' })
  @ApiResponse({
    status: 200,
    description: 'Returns a basic uptime response',
    schema: {
      type: 'object',
      example: { message: 'pong' },
    },
  })
  healthCheck(): { message: string } {
    return { message: 'pong' };
  }
}
