"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.login = exports.deleteUser = exports.editUser = exports.getUser = exports.createUser = exports.getUsers = void 0;
const async_wrapper_1 = __importDefault(require("../utils/async-wrapper"));
const custom_error_1 = __importDefault(require("../utils/custom-error"));
const user_services_1 = require("../services/user-services");
exports.getUsers = (0, async_wrapper_1.default)(async (_req, res, _next) => {
    const users = await (0, user_services_1.getAllUsers)();
    res.status(200).json({ message: "Users successfully retrieved!", users });
});
exports.createUser = (0, async_wrapper_1.default)(async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return next((0, custom_error_1.default)("Please fill in your username, email and password", 400));
    }
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
