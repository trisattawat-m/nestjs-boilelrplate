import { MqttConfig } from '@config/config';
import { MqttAdapterProvider, MqttServiceProvider } from '@config/providers';
import { Module } from '@nestjs/common';

@Module({
  providers: [MqttConfig, MqttAdapterProvider, MqttServiceProvider],
  exports: [MqttAdapterProvider],
})
export class MqttModule {}
