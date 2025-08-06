import { ecsLogger } from '@config/config/logger.config';
import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal Server Error';
    const stackTrace = exception instanceof Error ? exception.stack : undefined;

    ecsLogger.error('Unhandled Exception', {
      error: {
        message,
        type: exception.constructor.name,
        stack_trace: stackTrace,
      },
      http: {
        request: {
          method: request.method,
        },
        response: {
          status_code: status,
        },
      },
      url: {
        path: request.originalUrl,
      },
      event: {
        category: ['error'],
        action: 'unhandled_exception',
        kind: 'exception',
      },
    });

    super.catch(exception, host);
  }
}
