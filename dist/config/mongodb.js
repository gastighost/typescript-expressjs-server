"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = async () => {
    await mongoose_1.default.connect(process.env.MONGODB_URI);
    console.log("Successfully connected to db via mongoose!");
};
exports.default = connectDb;
