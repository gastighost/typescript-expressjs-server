"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../middleware/auth"));
const user_controller_1 = require("../controllers/user-controller");
router.get("/", user_controller_1.getUsers);
router.post("/", [
    (0, express_validator_1.check)("username")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Please input a username"),
    (0, express_validator_1.check)("email").trim().isEmail(),
    (0, express_validator_1.check)("password")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Please input a password"),
], user_controller_1.createUser);
router.get("/:userId", user_controller_1.getUser);
router.patch("/:userId", [
    (0, express_validator_1.check)("username")
        .optional()
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Please input a username"),
    (0, express_validator_1.check)("email")
        .optional()
        .trim()
        .exists({ checkFalsy: true })
        .bail()
        .isEmail()
        .withMessage("Please input a valid email"),
    (0, express_validator_1.check)("password")
        .optional()
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Please input a password"),
], user_controller_1.editUser);
router.delete("/:userId", user_controller_1.deleteUser);
router.post("/login", [
    (0, express_validator_1.check)("username")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Please input a username"),
    (0, express_validator_1.check)("password")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Please input a password"),
], user_controller_1.login);
router.get("/login/check-auth", auth_1.default, user_controller_1.checkAuth);
exports.default = router;
