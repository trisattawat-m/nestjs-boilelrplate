export interface MqttAdapterPort {
  subscribe(topic: string): Promise<string | null>;
  publish(topic: string, message: string): Promise<boolean>;
  getLastMessage(topic: string): Promise<string | null>;
}
