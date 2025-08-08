import { DahuaEventsController } from '@applications/controllers/dahua-event.controller';
import {
  DahuaEventProvider,
  DahuaEventAdapterProvider,
  DahuaEventRepositoryProvider,
} from '@config/providers';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DahuaEventsController],
  providers: [
    DahuaEventProvider,
    DahuaEventAdapterProvider,
    DahuaEventRepositoryProvider,
  ],
  exports: [DahuaEventProvider],
})
export class DahuaEventModule {}
