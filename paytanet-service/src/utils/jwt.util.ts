import * as jwt from 'jsonwebtoken';

export const decodeToken = <T>(token: string): T => {
  return jwt.decode(token) as T;
};
