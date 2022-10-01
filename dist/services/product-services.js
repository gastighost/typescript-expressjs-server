"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAProduct = exports.editAProduct = exports.getAProduct = exports.createNewProduct = exports.getAllProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const custom_error_1 = __importDefault(require("../utils/custom-error"));
const getAllProducts = async () => {
    const products = await product_1.default.find({});
    return products;
};
exports.getAllProducts = getAllProducts;
const createNewProduct = async (product) => {
    const { name, price, quantity, userId, available } = product;
    const newProduct = new product_1.default({
        name,
        price: Number(price) || undefined,
        quantity: Number(quantity) || undefined,
        userId: userId,
        available: available,
    });
    await newProduct.save();
    return newProduct;
};
exports.createNewProduct = createNewProduct;
const getAProduct = async (productId) => {
    const product = await product_1.default.findById(productId);
    if (!product) {
        throw (0, custom_error_1.default)("Could not find a product with this id", 400);
    }
    return product;
};
exports.getAProduct = getAProduct;
const editAProduct = async (productId, product) => {
    const { name, price, quantity, available, userId } = product;
    const editedProduct = await product_1.default.findOneAndUpdate({ _id: productId, userId: userId }, {
        name,
        price: Number(price) || undefined,
        quantity: Number(quantity) || undefined,
        available: available,
    }, { new: true });
    if (!editedProduct) {
        throw (0, custom_error_1.default)("You cannot edit this product", 403);
    }
    return editedProduct;
};
exports.editAProduct = editAProduct;
const deleteAProduct = async (productId, userId) => {
    const product = await product_1.default.findOneAndDelete({
        _id: productId,
        userId: userId,
    });
    if (!product) {
        throw (0, custom_error_1.default)("You cannot delete this product", 403);
    }
    return product;
};
exports.deleteAProduct = deleteAProduct;
