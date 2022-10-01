"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../middleware/auth"));
const product_controller_1 = require("../controllers/product-controller");
router.use(auth_1.default);
router.get("/", product_controller_1.getProducts);
router.post("/", product_controller_1.createProduct);
router.get("/:productId", product_controller_1.getProduct);
router.patch("/:productId", product_controller_1.editProduct);
router.delete("/:productId", product_controller_1.deleteProduct);
exports.default = router;
