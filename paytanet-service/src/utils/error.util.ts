import { HttpException } from '@nestjs/common';
import { AxiosError } from 'axios';

export const extractAxiosError = (error: AxiosError): void => {
  const status = error.response?.status || 500;
  const message =
    error.message || 'An error occurred while fetching DNS records';
  const errorData = error.response?.data || null;

  throw new HttpException({ message, errorData }, status);
};

export const isAxiosError = (error: any): error is AxiosError => {
  return error.isAxiosError === true;
};

export const ErrorHandler = (error: any): void => {
  console.log('ErrorHandler', error);
  if (isAxiosError(error)) {
    extractAxiosError(error);
  } else {
    throw new Error('An unexpected error occurred');
  }
};
