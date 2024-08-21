export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface WithdrawPayload {
  amount: number;
  currencyCode: string;
  note: string;
}

export interface WithdrawResponse {
  message: string;
  balance: number;
  currencyCode: string;
}
