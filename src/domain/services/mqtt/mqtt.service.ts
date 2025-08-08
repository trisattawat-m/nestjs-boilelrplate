import { MqttAdapterPort } from '@domain/adapters/mqtt/mqtt-service.adapter.port';
import { DahuaEventRepositoryPort } from '@domain/repositories';
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class MqttService implements OnModuleInit {
  constructor(
    private readonly _mqttAdapter: MqttAdapterPort,
    private readonly _dahuaEventRepository: DahuaEventRepositoryPort,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      await this._mqttAdapter.subscribe(
        'test/topic',
        async (message, topic) => {
          console.log(`[MQTT] New message on topic "${topic}":`, message);

          try {
            await this._dahuaEventRepository.recordMqttMessage(message);
          } catch (err) {
            console.error(`[MQTT] Failed to record message:`, err);
          }
        },
      );
    } catch (error) {
      console.error('[MQTT] Subscription error:', error);
    }
  }
}
