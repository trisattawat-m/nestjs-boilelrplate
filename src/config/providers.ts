import { DahuaEventAdapter } from '@domain/adapters/dahua-events/dahua-event.adapter';
import { DahuaEventAdapterPort } from '@domain/adapters/dahua-events/dahua-event.adapter.port';
import { DahuaEventService } from '@domain/services/dahua-events/dahua-event.service';
import { SERVICES, ADAPTERS } from '@infrastructure/shared/enum';
import { Provider } from '@nestjs/common';

//services provider
export const DahuaEventProvider: Provider = {
  provide: SERVICES.DAHUA_EVENT_SERVICE,
  useFactory(dahuaEventAdapter: DahuaEventAdapterPort) {
    return new DahuaEventService(dahuaEventAdapter);
  },
  inject: [ADAPTERS.DAHUA_EVENT_ADAPTER],
};

//adapters provider
export const DahuaEventAdapterProvider: Provider = {
  provide: ADAPTERS.DAHUA_EVENT_ADAPTER,
  useClass: DahuaEventAdapter,
};
