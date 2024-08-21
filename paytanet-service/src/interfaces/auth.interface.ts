export interface SignUserPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userAuth: {
    username: string;
  };
}

export interface JwtUserInfo extends SignUserPayload {}
