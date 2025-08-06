
import { DahuaEventsController } from '@applications/controllers/dahua-event.controller';
import { DahuaEventProvider, DahuaEventAdapterProvider } from '@config/providers';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DahuaEventsController],
  providers: [DahuaEventProvider, DahuaEventAdapterProvider],
  exports: [DahuaEventProvider],
})
export class DahuaEventModule {}
