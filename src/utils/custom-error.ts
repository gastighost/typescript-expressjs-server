export interface CustomErrorType {
  message: string;
  statusCode: number;
}

interface ValidationError {
  value?: string;
  msg?: string;
  param?: string;
  location?: string;
}

class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createError = (message: string, statusCode: number): CustomErrorType => {
  const error = new CustomError(message, statusCode);
  return error;
};

export const createValidationError = (errorArr: ValidationError[]): string => {
  const newErrorArr: string[] = errorArr.map(
    (error: ValidationError): string => {
      return `${error.param}: ${error.msg}`;
    }
  );

  return newErrorArr.join(", ");
};

export default createError;
