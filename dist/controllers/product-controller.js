"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.editProduct = exports.getProduct = exports.createProduct = exports.getProducts = void 0;
const async_wrapper_1 = __importDefault(require("../utils/async-wrapper"));
const product_services_1 = require("../services/product-services");
exports.getProducts = (0, async_wrapper_1.default)(async (_req, res, _next) => {
    const products = await (0, product_services_1.getAllProducts)();
    res
        .status(200)
        .json({ message: "Products successfully retrieved!", products });
});
exports.createProduct = (0, async_wrapper_1.default)(async (req, res, _next) => {
    const { name, price, quantity, available } = req.body;
    const userId = req.user?.userId;
    const newProduct = await (0, product_services_1.createNewProduct)({
        name,
        price,
        quantity,
        available,
        userId,
    });
    res.status(201).json({
        message: "Product successfully created!",
        product: newProduct,
    });
});
exports.getProduct = (0, async_wrapper_1.default)(async (req, res, _next) => {
    const { productId } = req.params;
    const product = await (0, product_services_1.getAProduct)(productId);
    res.status(200).json({
        message: "Product successfully retrieved!",
        product,
    });
});
exports.editProduct = (0, async_wrapper_1.default)(async (req, res, next) => {
    const { productId } = req.params;
    const { name, price, quantity, available } = req.body;
    const userId = req.user?.userId;
    const product = await (0, product_services_1.editAProduct)(productId, {
        name,
        price,
        quantity,
        available,
        userId,
    });
    res.status(200).json({
        message: "Product successfully updated!",
        product,
    });
});
exports.deleteProduct = (0, async_wrapper_1.default)(async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user?.userId;
    const product = await (0, product_services_1.deleteAProduct)(productId, userId);
    res.status(200).json({
        message: "Product successfully deleted!",
        product,
    });
});
