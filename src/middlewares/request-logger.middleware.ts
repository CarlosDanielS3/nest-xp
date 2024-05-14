import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    const req_id = Date.now();
    this.logger.warn(
      `req: method - [${req.method}] | url - ${req.url} | start - ${req_id} | req_id - ${req_id} | ${req.method != 'GET' ? `body: ${JSON.stringify(req?.body)}` : ''}}`,
    );
    res.on('finish', () => {
      const statusCode = res.statusCode;

      this.logger.warn(
        `res: method - [${req.method}] | url - ${req.url} | end -   ${Date.now()} | req_id - ${req_id} | status - ${statusCode}`,
      );
    });

    next();
  }
}
