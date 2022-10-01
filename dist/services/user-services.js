"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteAUser = exports.editAUser = exports.getAUser = exports.createAUser = exports.getAllUsers = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_1 = __importDefault(require("../models/user"));
const custom_error_1 = __importDefault(require("../utils/custom-error"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAllUsers = async () => {
    const users = await user_1.default.find({}).select("-password");
    return users;
};
exports.getAllUsers = getAllUsers;
const createAUser = async (user) => {
    const { username, email, password } = user;
    const hashedPassword = await (0, bcrypt_1.hash)(password, 12);
    const newUser = new user_1.default({ username, email, password: hashedPassword });
    await newUser.save();
    return newUser;
};
exports.createAUser = createAUser;
const getAUser = async (userId) => {
    const user = await user_1.default.findById(userId).select("-password");
    if (!user) {
        throw (0, custom_error_1.default)("No user with this id was found", 400);
    }
    return user;
};
exports.getAUser = getAUser;
const editAUser = async (userId, user) => {
    const { username, email, password } = user;
    let hashedPassword = undefined;
    if (password) {
        hashedPassword = await (0, bcrypt_1.hash)(password, 12);
    }
    const updatedUser = await user_1.default.findByIdAndUpdate(userId, { username, email, password: hashedPassword }, { new: true });
    if (!updatedUser) {
        throw (0, custom_error_1.default)("No user with this id was found", 400);
    }
    return updatedUser;
};
exports.editAUser = editAUser;
const deleteAUser = async (userId) => {
    const user = await user_1.default.findByIdAndDelete(userId);
    if (!user) {
        throw (0, custom_error_1.default)("No user was found with this id", 400);
    }
    return user;
};
exports.deleteAUser = deleteAUser;
const loginUser = async (user) => {
    const { username, password } = user;
    const loggedInUser = await user_1.default.findOne({ username });
    if (!loggedInUser) {
        throw (0, custom_error_1.default)("Username or password was wrong", 401);
    }
    const match = await (0, bcrypt_1.compare)(password, loggedInUser.password);
    if (!match) {
        throw (0, custom_error_1.default)("Username or password was wrong", 401);
    }
    const token = jsonwebtoken_1.default.sign({
        data: {
            userId: loggedInUser._id,
            username: loggedInUser.username,
            email: loggedInUser.email,
        },
    }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
};
exports.loginUser = loginUser;
