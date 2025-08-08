import { TestMqttPayload } from '@applications/schemas/request/dahua-event.request';
import { DahuaEventServicePort } from '@domain/services/dahua-events/dahua-event.service.port';
import { SERVICES } from '@infrastructure/shared/enum';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

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

  @Post('/mqtt')
  postMqttEvent(@Body() payload: TestMqttPayload) {
    return this._dahuaEventService.pubMqttMessage(payload);
  }
}
