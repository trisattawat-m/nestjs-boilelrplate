import { Injectable } from '@nestjs/common';
import { DahuaEventRepositoryPort } from '@domain/repositories';
import { DahuaEventServicePort } from './dahua-event.service.port';
import { DahuaEventAdapterPort, MqttAdapterPort } from '@domain/adapters';
import { TestMqttPayload } from '@applications/schemas/request/dahua-event.request';
@Injectable()
export class DahuaEventService implements DahuaEventServicePort {
  private mqttTopic = 'DahuaEventTopic';

  constructor(
    private readonly _dahuaEventAdapter: DahuaEventAdapterPort,
    private readonly _dahuaEventRepository: DahuaEventRepositoryPort,
    private readonly _mqttAdapter: MqttAdapterPort,
  ) {}

  async getEventInit(): Promise<string> {
    console.log(await this._dahuaEventRepository.getTableName());
    return this._dahuaEventAdapter.getEventInit();
  }

  async pubMqttMessage(message: TestMqttPayload): Promise<boolean> {
    try {
      await this._mqttAdapter.publish(this.mqttTopic, JSON.stringify(message));
      return true;
    } catch (error) {
      return false;
    }
  }
}
