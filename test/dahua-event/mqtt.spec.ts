import { Test, TestingModule } from '@nestjs/testing';
import { DahuaEventMqttSubscriber } from '@domain/adapters/mqtt/subscriber/dahua-event/dahua-event.mqtt.subscriber';
import { MqttConfig } from '@config/config';
import { mockDahuaEventMqttSubscriber } from 'test/mock-fn';

const mockMqttConfig: MqttConfig = {
  brokerUrl: 'mqtt://localhost:1883',
};

describe('DahuaEventMqttSubscriber', () => {
  let mqttSubscriber: DahuaEventMqttSubscriber;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MqttConfig,
          useValue: mockMqttConfig,
        },
        {
          provide: DahuaEventMqttSubscriber,
          useValue: mockDahuaEventMqttSubscriber,
        },
      ],
    }).compile();

    mqttSubscriber = module.get<DahuaEventMqttSubscriber>(
      DahuaEventMqttSubscriber,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call subscribe mock function', async () => {
    mockDahuaEventMqttSubscriber.subscribe.mockResolvedValueOnce(undefined);

    await expect(
      mqttSubscriber.subscribe('test/topic'),
    ).resolves.toBeUndefined();
    expect(mockDahuaEventMqttSubscriber.subscribe).toHaveBeenCalledWith(
      'test/topic',
    );
  });

  it('should call handleMessage mock function', () => {
    mqttSubscriber.handleMessage('test/topic', 'message');
    expect(mockDahuaEventMqttSubscriber.handleMessage).toHaveBeenCalledWith(
      'test/topic',
      'message',
    );
  });
});
