export class BusinessCode {
  constructor(
    public code: string,
    public message: string,
    public httpStatusCode: number,
  ) {}
}

export const BusinessCodes = {
  // Status 200
  C1000: new BusinessCode('1000', 'Success', 200),
  C1001: new BusinessCode('1001', 'Creation successful', 201),
  C1002: new BusinessCode('1002', 'Deletion successful', 202),

  // Status 400
  C4000: new BusinessCode('4000', 'Bad Request', 400),
  C4001: new BusinessCode('4001', 'Unauthorized', 401),
  C4003: new BusinessCode('4003', 'Forbidden', 403),
  C4004: new BusinessCode('4004', 'Not Found', 404),
  C4005: new BusinessCode('4005', 'Method Not Allowed', 405),
  C4009: new BusinessCode('4009', 'Conflict', 409),
  C4013: new BusinessCode('4013', 'Payload Too Large', 413),
  C4015: new BusinessCode('4015', 'Unsupported Media Type', 415),
  C4022: new BusinessCode('4022', 'Unprocessable Entity', 422),
  C4024: new BusinessCode('4024', 'Failed Dependency', 424),

  // Status 500
  C5000: new BusinessCode('5000', 'Internal Server Error', 500),
  C5001: new BusinessCode('5001', 'Not Implemented', 501),
  C5003: new BusinessCode('5003', 'Service Unavailable', 503),
  C5004: new BusinessCode('5004', 'Gateway Timeout', 504),
};

export const findBusinessCode = (status: number): BusinessCode => {
  for (const key in BusinessCodes) {
    if (BusinessCodes.hasOwnProperty(key)) {
      const businessCode = BusinessCodes[key];
      if (businessCode.httpStatusCode === status) {
        return businessCode;
      }
    }
  }
  return BusinessCodes.C5000;
};
