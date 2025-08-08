import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class TestMqttPayload {
  @ApiPropertyOptional({
    description: 'The MQTT message to publish',
    example: 'Hello from HTTP',
  })
  @IsString()
  @IsOptional()
  message?: string;
}
