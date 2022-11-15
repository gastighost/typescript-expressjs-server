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
exports.deleteProduct = exports.editProduct = exports.getProduct = exports.createProduct = exports.getProducts = void 0;
const express_validator_1 = require("express-validator");
const async_wrapper_1 = __importDefault(require("../utils/async-wrapper"));
const custom_error_1 = __importStar(require("../utils/custom-error"));
const product_services_1 = __importDefault(require("../services/product-services"));
exports.getProducts = (0, async_wrapper_1.default)(async (_req, res, _next) => {
    const products = await product_services_1.default.getAllProducts();
    res
        .status(200)
        .json({ message: "Products successfully retrieved!", products });
});
exports.createProduct = (0, async_wrapper_1.default)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const validationError = (0, custom_error_1.createValidationError)(errors.array());
        return next((0, custom_error_1.default)(validationError, 400));
    }
    const { name, price, quantity, available, date } = req.body;
    const userId = req.user?.userId;
    const newProduct = await product_services_1.default.createNewProduct({
        name,
        price,
        quantity,
        available,
        userId,
        date,
    });
    res.status(201).json({
        message: "Product successfully created!",
        product: newProduct,
    });
});
exports.getProduct = (0, async_wrapper_1.default)(async (req, res, _next) => {
    const { productId } = req.params;
    const product = await product_services_1.default.getAProduct(productId);
    res.status(200).json({
        message: "Product successfully retrieved!",
        product,
    });
});
exports.editProduct = (0, async_wrapper_1.default)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const validationError = (0, custom_error_1.createValidationError)(errors.array());
        return next((0, custom_error_1.default)(validationError, 400));
    }
    const { productId } = req.params;
    const { name, price, quantity, available, date } = req.body;
    const userId = req.user?.userId;
    const product = await product_services_1.default.editAProduct(productId, {
        name,
        price,
        quantity,
        available,
        userId,
        date,
    });
    res.status(200).json({
        message: "Product successfully updated!",
        product,
    });
});
exports.deleteProduct = (0, async_wrapper_1.default)(async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user?.userId;
    const product = await product_services_1.default.deleteAProduct(productId, userId);
    res.status(200).json({
        message: "Product successfully deleted!",
        product,
    });
});
