import {
  Catch,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

import {
  BusinessCodes,
  findBusinessCode,
} from '@/shared/exceptions/business-code';
import { HttpResponseData } from '@/interfaces/response.interface';

@Catch(HttpException)
export class HttpsExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();

    // ! Default response
    let responseData: HttpResponseData = {
      status: {
        code: BusinessCodes.C5000.code,
        message: BusinessCodes.C5000.message,
      },
      data: null,
    };

    // ! If the exception is an instance of HttpException
    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      // * If the exception response is an object, then we can
      if (typeof exceptionResponse === 'object') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { statusCode, error, ...newExceptionResponse } =
          exceptionResponse as {
            statusCode: number;
            error: string;
            message: string;
          };

        const businessCode = findBusinessCode(status);

        responseData = {
          status: {
            code: businessCode.code,
            message: businessCode.message,
          },
          data: {
            ...newExceptionResponse,
          },
        };
      }

      // * If the exception response is a string, then we can
      else {
        const businessCode = findBusinessCode(status);

        responseData = {
          status: {
            code: businessCode.code,
            message: businessCode.message,
          },
          data: { message: exceptionResponse },
        };
      }
    }

    // ! If the exception is an instance of AxiosErro
    else if ((exception as any)?.isAxiosError) {
      const { response } = exception as any;

      const businessCode = findBusinessCode(response?.status);

      responseData = {
        status: {
          code: businessCode.code,
          message: businessCode.message,
        },
        data: {
          message: response?.statusText,
        },
      };
    }

    response.status(status).json(responseData);
  }
}
