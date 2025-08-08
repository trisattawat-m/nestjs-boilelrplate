import { Injectable } from '@nestjs/common';
import { DahuaEventRepositoryPort } from './dahua-event.repository.port';
import { PrismaService } from '@infrastructure/prisma/prisma.service';

@Injectable()
export class DahuaEventRepository implements DahuaEventRepositoryPort {
  constructor(private readonly _prisma: PrismaService) {}

  async getHandshake(): Promise<string> {
    try {
      return 'Handshake successful';
    } catch (error) {
      console.error('Error in getHandshake:', error);
      throw new Error('Failed to get handshake');
    }
  }

  async recordMqttMessage(message: string): Promise<boolean> {
    console.log(message);
    try {
      await this._prisma.dahuaEvent.create({
        data: {
          message,
        },
      });
      return true;
    } catch (error) {
      console.error('Error in recordMqttMessage:', error);
      throw new Error('Failed to record MQTT message');
    }
  }
}
