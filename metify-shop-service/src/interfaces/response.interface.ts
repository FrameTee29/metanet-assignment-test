export interface HttpResponseStatus {
  code: string;
  message: string;
}

export interface HttpResponseData {
  status: HttpResponseStatus;
  data: any;
}

export interface ErrorMessage {
  message: string;
}

export interface Response<T> {
  status: HttpResponseStatus;
  data: T;
}

export interface ErrorResponse {
  status: HttpResponseStatus;
  data: ErrorMessage;
}
