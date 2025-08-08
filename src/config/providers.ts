import { Provider } from '@nestjs/common';
import { SERVICES, ADAPTERS, REPOSITORY } from '@infrastructure/shared/enum';
import {
  DahuaEventRepositoryPort,
  DahuaEventRepository,
} from '@domain/repositories';
import { DahuaEventService } from '@domain/services';
import { DahuaEventAdapterPort, DahuaEventAdapter } from '@domain/adapters';
import { MqttAdapter } from '@domain/adapters/mqtt/mqtt-service.adapter';
import { MqttAdapterPort } from '@domain/adapters/mqtt/mqtt-service.adapter.port';
import { MqttService } from '@domain/services/mqtt/mqtt.service';

//services provider
export const DahuaEventServiceProvider: Provider = {
  provide: SERVICES.DAHUA_EVENT_SERVICE,
  useFactory(
    dahuaEventAdapter: DahuaEventAdapterPort,
    dahuaEventRepository: DahuaEventRepositoryPort,
    mqttAdapter: MqttAdapterPort,
  ) {
    return new DahuaEventService(
      dahuaEventAdapter,
      dahuaEventRepository,
      mqttAdapter,
    );
  },
  inject: [
    ADAPTERS.DAHUA_EVENT_ADAPTER,
    REPOSITORY.DAHUA_EVENT_REPOSITORY,
    ADAPTERS.MQTT_ADAPTER,
  ],
};

export const MqttServiceProvider: Provider = {
  provide: SERVICES.MQTT_SERVICE,
  useFactory(mqttAdapter: MqttAdapterPort) {
    return new MqttService(mqttAdapter);
  },
  inject: [ADAPTERS.MQTT_ADAPTER],
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

//mqtt provider
export const MqttAdapterProvider: Provider = {
  provide: ADAPTERS.MQTT_ADAPTER,
  useClass: MqttAdapter,
};
