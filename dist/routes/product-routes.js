"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../middleware/auth"));
const product_controller_1 = require("../controllers/product-controller");
const express_validator_1 = require("express-validator");
router.use(auth_1.default);
router.get("/", product_controller_1.getProducts);
router.post("/", [
    (0, express_validator_1.check)("name")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Please include a name."),
    (0, express_validator_1.check)("price").isFloat().toFloat().withMessage("Price should be a number"),
    (0, express_validator_1.check)("quantity")
        .isInt()
        .toInt()
        .withMessage("Quantity should be a number"),
    (0, express_validator_1.check)("available")
        .isBoolean()
        .toBoolean()
        .withMessage("Available should be either true or false"),
    (0, express_validator_1.check)("date")
        .toDate()
        .isISO8601()
        .bail()
        .customSanitizer((date) => date.toLocaleString("en-US"))
        .withMessage("Date should be a valid format"),
], product_controller_1.createProduct);
router.get("/:productId", product_controller_1.getProduct);
router.patch("/:productId", [
    (0, express_validator_1.check)("name")
        .optional()
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Please include a name."),
    (0, express_validator_1.check)("price")
        .optional()
        .isFloat()
        .toFloat()
        .withMessage("Price should be a number"),
    (0, express_validator_1.check)("quantity")
        .optional()
        .isInt()
        .toInt()
        .withMessage("Quantity should be a number"),
    (0, express_validator_1.check)("available")
        .optional()
        .isBoolean()
        .toBoolean()
        .withMessage("Available should be either true or false"),
    (0, express_validator_1.check)("date")
        .optional()
        .toDate()
        .isISO8601()
        .bail()
        .customSanitizer((date) => date.toLocaleString("en-US"))
        .withMessage("Date should be a valid format"),
], product_controller_1.editProduct);
router.delete("/:productId", product_controller_1.deleteProduct);
exports.default = router;
