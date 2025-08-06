import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/common/filters/exception.filter';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { DahuaEventModule } from './dahua-event.module';
import { HealthModule } from './health.module';
@Module({
  imports: [HealthModule, DahuaEventModule],
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
