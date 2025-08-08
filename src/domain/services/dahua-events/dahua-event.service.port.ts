import { TestMqttPayload } from '@applications/schemas/request/dahua-event.request';

export interface DahuaEventServicePort {
  getEventInit(): Promise<string>;
  pubMqttMessage(message: TestMqttPayload): Promise<boolean>;
}
