import { Provider } from '@nestjs/common';
import { SERVICES, ADAPTERS, REPOSITORY } from '@infrastructure/shared/enum';
import { DahuaEventAdapterPort, DahuaEventAdapter } from '@domain/adapters';
import {
  DahuaEventRepositoryPort,
  DahuaEventRepository,
} from '@domain/repositories';
import { DahuaEventService } from '@domain/services';

//services provider
export const DahuaEventProvider: Provider = {
  provide: SERVICES.DAHUA_EVENT_SERVICE,
  useFactory(
    dahuaEventAdapter: DahuaEventAdapterPort,
    dahuaEventRepository: DahuaEventRepositoryPort,
  ) {
    return new DahuaEventService(dahuaEventAdapter, dahuaEventRepository);
  },
  inject: [ADAPTERS.DAHUA_EVENT_ADAPTER, REPOSITORY.DAHUA_EVENT_REPOSITORY],
};

//adapters provider
export const DahuaEventAdapterProvider: Provider = {
  provide: ADAPTERS.DAHUA_EVENT_ADAPTER,
  useClass: DahuaEventAdapter,
};

//repositories provider
export const DahuaEventRepositoryProvider: Provider = {
  provide: REPOSITORY.DAHUA_EVENT_REPOSITORY,
  useClass: DahuaEventRepository,
};
