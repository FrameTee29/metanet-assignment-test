import {
  Injectable,
  HttpStatus,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BusinessCodes } from '@/shared/exceptions/business-code';

import { HttpResponseData } from '@/interfaces/response.interface';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        let status = {};

        if (request.method === 'POST') {
          response.status(HttpStatus.CREATED);
          status = {
            code: BusinessCodes.C1001.code,
            message: BusinessCodes.C1001.message,
          };
        } else if (request.method === 'GET' || request.method === 'PATCH') {
          response.status(HttpStatus.OK);
          status = {
            code: BusinessCodes.C1000.code,
            message: BusinessCodes.C1000.message,
          };
        } else if (request.method === 'DELETE') {
          response.status(HttpStatus.ACCEPTED);
          status = {
            code: BusinessCodes.C1002.code,
            message: BusinessCodes.C1002.message,
          };
        } else {
          response.status(HttpStatus.OK);
          status = {
            code: BusinessCodes.C1000.code,
            message: BusinessCodes.C1000.message,
          };
        }
        return {
          status,
          data: data,
        } as HttpResponseData;
      }),
      catchError((error) => {
        if (error instanceof NotFoundException) {
          response.status(HttpStatus.UNAUTHORIZED).json({
            status: {
              code: HttpStatus.NOT_FOUND,
              message: 'Not Found',
            },
            data: null,
          });
        }
        throw error;
      }),
    );
  }
}
