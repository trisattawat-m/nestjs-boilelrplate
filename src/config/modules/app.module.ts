import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '@infrastructure/filters/exception.filter';
import { LoggerMiddleware } from '@infrastructure/middleware/logger.middleware';
import { DahuaEventModule } from './dahua-event.module';
import { HealthModule } from './health.module';
import { MqttModule } from './mqtt.module';
@Module({
  imports: [HealthModule, DahuaEventModule, MqttModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
