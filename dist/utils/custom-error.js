"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidationError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
const createError = (message, statusCode) => {
    const error = new CustomError(message, statusCode);
    return error;
};
const createValidationError = (errorArr) => {
    const newErrorArr = errorArr.map((error) => {
        return `${error.param}: ${error.msg}`;
    });
    return newErrorArr.join(", ");
};
exports.createValidationError = createValidationError;
exports.default = createError;
