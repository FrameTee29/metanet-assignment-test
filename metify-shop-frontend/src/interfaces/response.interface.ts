export interface Response<T> {
  status: {
    code: number
    message: string
  }
  data: T
}

export interface ErrorResponse {
  status: {
    code: number
    message: string
  }
  data: {
    message: string
  }
}
