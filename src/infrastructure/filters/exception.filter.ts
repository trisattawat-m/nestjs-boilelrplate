import { ecsLogger } from '@config/logger.config';
import { BaseException } from '@infrastructure/shared/exceptions/base.exception';
import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let status: number;
    let body: any;
    let errorType: string;
    let domain: string | null = null;
    let code: string | null = null;

    if (exception instanceof BaseException) {
      status = exception.statusCode;
      errorType = exception.name;
      domain = exception.domain;
      code = exception.code;
      body = {
        status,
        error: errorType,
        domain,
        code,
        message: exception.message,
      };
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorType = exception.name;
      body = { status, error: errorType, message: exception.message };
    } else if (exception instanceof Error) {
      status = 500;
      errorType = exception.constructor.name;
      body = { status, error: errorType, message: exception.message };
    } else {
      status = 500;
      errorType = 'UnknownError';
      body = { status, error: errorType, message: 'Internal Server Error' };
    }

    // Simplified logging
    const logData = {
      status,
      error: errorType,
      domain,
      code,
      message: body.message,
      path: request.originalUrl,
      method: request.method,
    };

    if (status < 400) {
      ecsLogger.info(body.message, logData);
    } else {
      ecsLogger.error(body.message, logData);
    }
  }
}
