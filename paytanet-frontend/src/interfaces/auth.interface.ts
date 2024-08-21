export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: string
}

export interface RegisterPayload {
  username: string
  password: string
}

export interface RegisterResponse {
  message: string
}
