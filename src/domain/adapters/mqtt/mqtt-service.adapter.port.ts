export interface MqttAdapterPort {
  subscribe(
    topic: string,
    messageHandler: (message: string, topic: string) => Promise<void>,
  ): Promise<void>;
  publish(topic: string, message: string): Promise<boolean>;
  getLastMessage(topic: string): Promise<string | null>;
}
