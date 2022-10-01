"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = createError;
