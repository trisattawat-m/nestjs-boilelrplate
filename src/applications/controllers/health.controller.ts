import { DOMAIN } from '@infrastructure/shared/enum';
import { ForbiddenError } from '@infrastructure/shared/exceptions/http-error';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor() {}

  @Get('/')
  async health(): Promise<boolean> {
    // return true;
    throw new ForbiddenError(
      DOMAIN.HEALTH,
      'FORBIDDEN',
      'Access to health check is forbidden',
    );
  }
}
