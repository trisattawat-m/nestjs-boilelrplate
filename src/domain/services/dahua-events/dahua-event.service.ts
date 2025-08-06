import { Injectable } from '@nestjs/common';
import { DahuaEventServicePort } from './dahua-event.service.port';
import { DahuaEventAdapterPort } from '@domain/adapters/dahua-events/dahua-event.adapter.port';
@Injectable()
export class DahuaEventService implements DahuaEventServicePort {
  constructor(private readonly _dahuaEventAdapter: DahuaEventAdapterPort) {}

  async getEventInit(): Promise<string> {
    return await this._dahuaEventAdapter.getEventInit();
  }
}
