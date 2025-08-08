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

      this.mqttClient.on('message', (topic, message) => {
        const payload = message.toString();
        this.lastMessages.set(topic, payload);
        console.log(`[MQTT] Received on "${topic}": ${payload}`);
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
      this.mqttClient.end(true, () => {
        console.log('[MQTT] Disconnected from broker');
      });
    }
  }

  async subscribe(topic: string): Promise<string | null> {
    if (!this.mqttClient) {
      throw new Error('[MQTT] Client is not connected');
    }

    if (!this.lastMessages.has(topic)) {
      await new Promise<void>((resolve, reject) => {
        this.mqttClient.subscribe(topic, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      this.lastMessages.set(topic, null);
    }

    return this.lastMessages.get(topic);
  }

  async getLastMessage(topic: string): Promise<string | null> {
    return this.lastMessages.get(topic) || null;
  }

  async publish(topic: string, message: string): Promise<boolean> {
    if (!this.mqttClient) {
      throw new Error('[MQTT] Client is not connected');
    }

    this.mqttClient.publish(topic, message, (err) => {
      if (err) {
        console.error(`[MQTT] Failed to publish to "${topic}":`, err.message);
      }
    });
    return true;
  }
}
