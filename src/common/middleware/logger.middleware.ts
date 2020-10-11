import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  private readonly logger = new Logger(LoggerMiddleware.name);
  use(req: Request, res: Response, next: Function) {
    const request = `${req.method}: ${req.originalUrl}`;
    this.logger.log(request);
    next();
  }
}
