import { Injectable } from '@nestjs/common';
import { DahuaEventAdapterPort } from './dahua-event.adapter.port';

@Injectable()
export class DahuaEventAdapter implements DahuaEventAdapterPort {
  constructor() {}

  getEventInit(): string {
    return 'DAHUA';
  }
}
