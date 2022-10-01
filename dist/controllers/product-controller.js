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
exports.deleteProduct = exports.editProduct = exports.getProduct = exports.createProduct = exports.getProducts = void 0;
const async_wrapper_1 = __importDefault(require("../utils/async-wrapper"));
const custom_error_1 = __importDefault(require("../utils/custom-error"));
const product_1 = __importDefault(require("../models/product"));
exports.getProducts = (0, async_wrapper_1.default)((_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.find({});
    res
        .status(200)
        .json({ message: "Products successfully retrieved!", products });
}));
exports.createProduct = (0, async_wrapper_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, price, quantity, available } = req.body;
    const newProduct = new product_1.default({
        name,
        price: Number(price) || undefined,
        quantity: Number(quantity) || undefined,
        userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
        available: available,
    });
    yield newProduct.save();
    res.status(201).json({
        message: "Product successfully created!",
        product: newProduct,
    });
}));
exports.getProduct = (0, async_wrapper_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const product = yield product_1.default.findById(productId);
    res.status(200).json({
        message: "Product successfully retrieved!",
        product,
    });
}));
exports.editProduct = (0, async_wrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { productId } = req.params;
    const { name, price, quantity, available } = req.body;
    const product = yield product_1.default.findOneAndUpdate({ _id: productId, userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId }, {
        name,
        price: Number(price) || undefined,
        quantity: Number(quantity) || undefined,
        available: available,
    }, { new: true });
    if (!product) {
        return next((0, custom_error_1.default)("You cannot edit this product", 403));
    }
    res.status(200).json({
        message: "Product successfully updated!",
        product,
    });
}));
exports.deleteProduct = (0, async_wrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { productId } = req.params;
    const product = yield product_1.default.findOneAndDelete({
        _id: productId,
        userId: (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId,
    });
    if (!product) {
        return next((0, custom_error_1.default)("You cannot delete this product", 403));
    }
    res.status(200).json({
        message: "Product successfully deleted!",
        product,
    });
}));
