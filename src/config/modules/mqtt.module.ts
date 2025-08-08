import { MqttConfig } from '@config/config';
import {
  DahuaEventRepositoryProvider,
  MqttAdapterProvider,
  MqttServiceProvider,
} from '@config/providers';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    MqttConfig,
    MqttAdapterProvider,
    MqttServiceProvider,
    DahuaEventRepositoryProvider,
  ],
})

export class MqttModule {}
