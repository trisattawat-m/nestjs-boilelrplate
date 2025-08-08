import { DahuaEventsController } from '@applications/controllers/dahua-event.controller';
import { MqttConfig } from '@config/config';
import {
  DahuaEventServiceProvider,
  DahuaEventAdapterProvider,
  DahuaEventRepositoryProvider,
  MqttAdapterProvider,
} from '@config/providers';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DahuaEventsController],
  providers: [
    DahuaEventServiceProvider,
    DahuaEventAdapterProvider,
    DahuaEventRepositoryProvider,
    MqttAdapterProvider,
    MqttConfig,
  ],
})
export class DahuaEventModule {}
