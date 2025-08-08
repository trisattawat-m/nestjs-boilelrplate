import { Injectable } from '@nestjs/common';
import { DahuaEventAdapterPort } from '@domain/adapters';
import { DahuaEventRepositoryPort } from '@domain/repositories';
import { DahuaEventServicePort } from './dahua-event.service.port';
@Injectable()
export class DahuaEventService implements DahuaEventServicePort {
  constructor(
    private readonly _dahuaEventAdapter: DahuaEventAdapterPort,
    private readonly _dahuaEventRepository: DahuaEventRepositoryPort,
  ) {}

  async getEventInit(): Promise<string> {
    console.log(await this._dahuaEventRepository.getTableName());
    return await this._dahuaEventAdapter.getEventInit();
  }
}
