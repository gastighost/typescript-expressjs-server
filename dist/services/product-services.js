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
exports.deleteAProduct = exports.editAProduct = exports.getAProduct = exports.createNewProduct = exports.getAllProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const custom_error_1 = __importDefault(require("../utils/custom-error"));
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.find({});
    return products;
});
exports.getAllProducts = getAllProducts;
const createNewProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, quantity, userId, available } = product;
    const newProduct = new product_1.default({
        name,
        price: Number(price) || undefined,
        quantity: Number(quantity) || undefined,
        userId: userId,
        available: available,
    });
    yield newProduct.save();
    return newProduct;
});
exports.createNewProduct = createNewProduct;
const getAProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_1.default.findById(productId);
    if (!product) {
        throw (0, custom_error_1.default)("Could not find a product with this id", 400);
    }
    return product;
});
exports.getAProduct = getAProduct;
const editAProduct = (productId, product) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, quantity, available, userId } = product;
    const editedProduct = yield product_1.default.findOneAndUpdate({ _id: productId, userId: userId }, {
        name,
        price: Number(price) || undefined,
        quantity: Number(quantity) || undefined,
        available: available,
    }, { new: true });
    if (!editedProduct) {
        throw (0, custom_error_1.default)("You cannot edit this product", 403);
    }
    return editedProduct;
});
exports.editAProduct = editAProduct;
const deleteAProduct = (productId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_1.default.findOneAndDelete({
        _id: productId,
        userId: userId,
    });
    if (!product) {
        throw (0, custom_error_1.default)("You cannot delete this product", 403);
    }
    return product;
});
exports.deleteAProduct = deleteAProduct;
