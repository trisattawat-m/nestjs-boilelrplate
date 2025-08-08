import { ecsLogger } from '@config/config/logger.config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ObjectFlattener } from '../utils/flatten-object.util';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    ecsLogger.info(
      'Incoming Request',
      ObjectFlattener.flatten({
        http: {
          request: {
            method: req.method,
          },
        },
        url: {
          full: fullUrl,
        },
        user_agent: req.get('user-agent'),
        client: {
          ip: req.ip,
        },
      }),
    );

    res.on('finish', () => {
      const duration = Date.now() - start;

      const logPayload = {
        http: {
          response: {
            status_code: res.statusCode,
          },
        },
        event: {
          duration: `${duration}ms`,
          action: 'http_request',
        },
        url: {
          full: fullUrl,
        },
      };

      const flattenedLog = ObjectFlattener.flatten(logPayload);

      if (res.statusCode >= 400) {
        ecsLogger.error('Error', flattenedLog);
      } else {
        ecsLogger.info('Success', flattenedLog);
      }
    });

    next();
  }
}
