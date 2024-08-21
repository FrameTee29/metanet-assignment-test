import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { decodeToken } from '@/utils/jwt.util';

import { SignUserPayload } from '@/interfaces/auth.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new UnauthorizedException('Unauthorized');
    }

    const accessToken = authorization.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException('Token missing or invalid');
    }

    try {
      const decoded = decodeToken<SignUserPayload>(accessToken);

      req['user'] = decoded;

      next();
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Not pass token validation');
    }
  }
}
