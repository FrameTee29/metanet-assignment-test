import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

import configuration from '@/config/configuration';
import { SignUserPayload } from '@/interfaces/auth.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

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
      const { secret } = configuration().jwt;

      const decodedToken: SignUserPayload = await this.jwtService.verifyAsync(
        accessToken,
        {
          secret,
        },
      );

      req['user'] = decodedToken;

      next();
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Not pass token validation');
    }
  }
}
