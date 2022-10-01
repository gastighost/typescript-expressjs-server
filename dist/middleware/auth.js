"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const custom_error_1 = __importDefault(require("../utils/custom-error"));
const auth = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return next((0, custom_error_1.default)("Token must be provided", 401));
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return next((0, custom_error_1.default)("Token must be provided", 401));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded.data;
        next();
    }
    catch (error) {
        next((0, custom_error_1.default)("Session is expired or invalid", 401));
    }
};
exports.default = auth;
