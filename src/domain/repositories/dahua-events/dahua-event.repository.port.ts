export interface DahuaEventRepositoryPort {
  getHandshake(): Promise<string>;
  recordMqttMessage(message: string): Promise<boolean>;
}
