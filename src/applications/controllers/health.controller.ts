import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor() {}

  @Get('/')
  async health(): Promise<boolean> {
    return true;
  }
}
