import { MqttAdapterPort } from '@domain/adapters/mqtt/mqtt-service.adapter.port';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class MqttService implements OnModuleInit {
  constructor(private readonly mqttAdapter: MqttAdapterPort) {}

  async onModuleInit(): Promise<void> {
    try {
      const lastMessage = await this.mqttAdapter.subscribe('test/topic');
      console.log(
        `Subscribed to 'test/topic'. Last message: ${lastMessage ?? '[none]'}`,
      );
    } catch (error) {
      console.error('[MQTT] Subscription error:', error);
    }
  }
}
