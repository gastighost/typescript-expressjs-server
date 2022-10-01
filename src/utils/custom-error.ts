interface CustomErrorType {
  message: string;
  statusCode: number;
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

export default createError;
