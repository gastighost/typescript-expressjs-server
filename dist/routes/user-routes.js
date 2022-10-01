"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = require("../controllers/user-controller");
router.get("/", user_controller_1.getUsers);
router.post("/", user_controller_1.createUser);
router.get("/:userId", user_controller_1.getUser);
router.patch("/:userId", user_controller_1.editUser);
router.delete("/:userId", user_controller_1.deleteUser);
router.post("/login", user_controller_1.login);
exports.default = router;
