"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../models/product"));
const custom_error_1 = __importDefault(require("../utils/custom-error"));
class ProductServices {
    async getAllProducts() {
        const products = await product_1.default.find({});
        return products;
    }
    async createNewProduct(product) {
        const { name, price, quantity, userId, available, date } = product;
        const newProduct = new product_1.default({
            name,
            price: Number(price) || undefined,
            quantity: Number(quantity) || undefined,
            userId: userId,
            available: available,
            date,
        });
        await newProduct.save();
        return newProduct;
    }
    async getAProduct(productId) {
        const product = await product_1.default.findById(productId);
        if (!product) {
            throw (0, custom_error_1.default)("Could not find a product with this id", 400);
        }
        return product;
    }
    async editAProduct(productId, product) {
        const { name, price, quantity, available, userId, date } = product;
        const editedProduct = await product_1.default.findOneAndUpdate({ _id: productId, userId: userId }, {
            name,
            price: Number(price) || undefined,
            quantity: Number(quantity) || undefined,
            available: available,
            date,
        }, { new: true });
        if (!editedProduct) {
            throw (0, custom_error_1.default)("You cannot edit this product", 403);
        }
        return editedProduct;
    }
    async deleteAProduct(productId, userId) {
        const product = await product_1.default.findOneAndDelete({
            _id: productId,
            userId: userId,
        });
        if (!product) {
            throw (0, custom_error_1.default)("You cannot delete this product", 403);
        }
        return product;
    }
}
exports.default = new ProductServices();
