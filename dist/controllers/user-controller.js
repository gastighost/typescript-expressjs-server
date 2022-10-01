"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.deleteUser = exports.editUser = exports.getUser = exports.createUser = exports.getUsers = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const async_wrapper_1 = __importDefault(require("../utils/async-wrapper"));
const custom_error_1 = __importDefault(require("../utils/custom-error"));
const user_1 = __importDefault(require("../models/user"));
exports.getUsers = (0, async_wrapper_1.default)((_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find({});
    res.status(200).json({ message: "Users successfully retrieved!", users });
}));
exports.createUser = (0, async_wrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = req.body;
    if (!username || !email) {
        return next((0, custom_error_1.default)("Please fill in both username and password", 400));
    }
    const newUser = new user_1.default({ username, email });
    yield newUser.save();
    res
        .status(201)
        .json({ message: "User successfully created!", user: newUser });
}));
exports.getUser = (0, async_wrapper_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield user_1.default.findById(userId);
    res.status(200).json({ message: "User successfully retrieved!", user });
}));
exports.editUser = (0, async_wrapper_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { username, email } = req.body;
    const user = yield user_1.default.findByIdAndUpdate(userId, { username, email }, { new: true });
    res.status(200).json({ message: "User successfully updated!", user });
}));
exports.deleteUser = (0, async_wrapper_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield user_1.default.findByIdAndDelete(userId);
    res.status(200).json({ message: "User successfully deleted!", user });
}));
exports.login = (0, async_wrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = req.body;
    const user = yield user_1.default.findOne({ username, email });
    if (!user) {
        return next((0, custom_error_1.default)("Username or email was wrong", 401));
    }
    const token = jsonwebtoken_1.default.sign({
        data: { userId: user._id, username: user.username, email: user.email },
    }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "User successfully logged in!", token });
}));
