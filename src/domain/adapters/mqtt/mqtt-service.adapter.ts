import { MqttConfig } from '@config/config';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { MqttAdapterPort } from './mqtt-service.adapter.port';

@Injectable()
export class MqttAdapter
  implements OnModuleInit, OnModuleDestroy, MqttAdapterPort
{
  private mqttClient: mqtt.MqttClient | null = null;
  private lastMessages = new Map<string, string | null>();

  constructor(private readonly config: MqttConfig) {}

  async onModuleInit(): Promise<void> {
    try {
      this.mqttClient = mqtt.connect(
        this.config.brokerUrl,
        this.config.options,
      );

      this.mqttClient.on('connect', () => {
        console.log('[MQTT] Connected to broker:', this.config.brokerUrl);
      });

      this.mqttClient.on('error', (err) => {
        console.error('[MQTT] Connection error:', err.message);
      });
    } catch (error) {
      console.error('[MQTT] Failed to connect:', error);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.mqttClient) {
      await new Promise<void>((resolve) => {
        this.mqttClient!.end(true, () => {
          console.log('[MQTT] Disconnected from broker');
          resolve();
        });
      });
    }
  }

  async subscribe(
    topic: string,
    messageHandler: (message: string, topic: string) => Promise<void>,
  ): Promise<void> {
    if (!this.mqttClient) {
      throw new Error('[MQTT] Client is not connected');
    }

    await new Promise<void>((resolve, reject) => {
      this.mqttClient!.subscribe(topic, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Remove previous listeners to prevent multiple calls if subscribe is called multiple times on same topic
    this.mqttClient.removeAllListeners('message');

    this.mqttClient.on('message', async (msgTopic, message) => {
      if (msgTopic === topic) {
        const payload = message.toString();
        this.lastMessages.set(topic, payload);
        try {
          await messageHandler(payload, topic);
        } catch (error) {
          console.error(
            `[MQTT] Error in messageHandler for topic ${topic}:`,
            error,
          );
        }
      }
    });
  }

  async getLastMessage(topic: string): Promise<string | null> {
    return this.lastMessages.get(topic) || null;
  }

  async publish(topic: string, message: string): Promise<boolean> {
    if (!this.mqttClient) {
      throw new Error('[MQTT] Client is not connected');
    }

    await new Promise<void>((resolve, reject) => {
      this.mqttClient!.publish(topic, message, (err) => {
        if (err) {
          console.error(`[MQTT] Failed to publish to "${topic}":`, err.message);
          reject(err);
        } else {
          resolve();
        }
      });
    });

    return true;
  }
}
