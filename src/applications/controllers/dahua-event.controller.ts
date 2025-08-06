import { DahuaEventServicePort } from '@domain/services/dahua-events/dahua-event.service.port';
import { SERVICES } from '@infrastructure/shared/enum';
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dahua-Event')
@Controller('dahua-event')
export class DahuaEventsController {
  constructor(
    @Inject(SERVICES.DAHUA_EVENT_SERVICE)
    private readonly _dahuaEventService: DahuaEventServicePort,
  ) {}

  @Get('/')
  getDahuaEvent() {
    return this._dahuaEventService.getEventInit();
  }
}
