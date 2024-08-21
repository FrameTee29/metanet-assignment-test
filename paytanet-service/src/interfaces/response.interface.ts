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
