import mqtt from 'mqtt/*';

require('dotenv').config();

export class PostgresConfig {
  host: string;

  constructor() {
    this.host = process.env.POSTGRES_HOST || 'postgresql://postgres:password@localhost:5432/mydb';
  }
}

export class MqttConfig {
  brokerUrl: string;
  options?: mqtt.IClientOptions;

  constructor() {
    this.brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';
    this.options = {
      username: process.env.MQTT_USERNAME || '',
      password: process.env.MQTT_PASSWORD || '',
      clientId: process.env.MQTT_CLIENT_ID || '',
      clean: true,
    };
  }
}
