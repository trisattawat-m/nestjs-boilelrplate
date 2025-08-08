import { Module } from '@nestjs/common';
import {
  DahuaEventServiceProvider,
  DahuaEventAdapterProvider,
  DahuaEventRepositoryProvider,
  MqttAdapterProvider,
  MqttServiceProvider,
} from '@config/providers';
import { DahuaEventsController } from '@applications/controllers/dahua-event.controller';
import { MqttConfig } from '@config/config';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
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
