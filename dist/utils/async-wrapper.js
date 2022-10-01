"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = asyncWrapper;
