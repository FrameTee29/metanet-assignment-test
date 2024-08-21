export interface JwtUserInfo {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  userAuth: {
    username: string
  }
  iat: number
  exp: number
}
