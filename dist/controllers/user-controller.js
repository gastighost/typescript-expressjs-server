"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.login = exports.deleteUser = exports.editUser = exports.getUser = exports.createUser = exports.getUsers = void 0;
const express_validator_1 = require("express-validator");
const async_wrapper_1 = __importDefault(require("../utils/async-wrapper"));
const custom_error_1 = __importStar(require("../utils/custom-error"));
const user_services_1 = require("../services/user-services");
exports.getUsers = (0, async_wrapper_1.default)(async (_req, res, _next) => {
    const users = await (0, user_services_1.getAllUsers)();
    res.status(200).json({ message: "Users successfully retrieved!", users });
});
exports.createUser = (0, async_wrapper_1.default)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const validationError = (0, custom_error_1.createValidationError)(errors.array());
        return next((0, custom_error_1.default)(validationError, 400));
    }
    const { username, email, password } = req.body;
    const newUser = await (0, user_services_1.createAUser)({ username, email, password });
    res
        .status(201)
        .json({ message: "User successfully created!", user: newUser });
});
exports.getUser = (0, async_wrapper_1.default)(async (req, res, _next) => {
    const { userId } = req.params;
    const user = await (0, user_services_1.getAUser)(userId);
    res.status(200).json({ message: "User successfully retrieved!", user });
});
exports.editUser = (0, async_wrapper_1.default)(async (req, res, _next) => {
    const { userId } = req.params;
    const { username, email, password } = req.body;
    const user = await (0, user_services_1.editAUser)(userId, { username, email, password });
    res.status(200).json({ message: "User successfully updated!", user });
});
exports.deleteUser = (0, async_wrapper_1.default)(async (req, res, _next) => {
    const { userId } = req.params;
    const user = await (0, user_services_1.deleteAUser)(userId);
    res.status(200).json({ message: "User successfully deleted!", user });
});
exports.login = (0, async_wrapper_1.default)(async (req, res, next) => {
    const { username, password } = req.body;
    const token = await (0, user_services_1.loginUser)({ username, password });
    res.status(200).json({ message: "User successfully logged in!", token });
});
exports.checkAuth = (0, async_wrapper_1.default)(async (req, res, next) => {
    const { user } = req;
    res.status(200).json({ message: "You are currently logged in!", user });
});
