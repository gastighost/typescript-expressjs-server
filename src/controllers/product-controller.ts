/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, NextFunction } from "express";
import asyncWrapper from "../utils/async-wrapper";
import createError from "../utils/custom-error";

import { RequestAuthType } from "../middleware/auth";

import Product from "../models/product";

export const getProducts = asyncWrapper(
  async (_req: RequestAuthType, res: Response, _next: NextFunction) => {
    const products = await Product.find({});

    res
      .status(200)
      .json({ message: "Products successfully retrieved!", products });
  }
);

export const createProduct = asyncWrapper(
  async (req: RequestAuthType, res: Response, _next: NextFunction) => {
    const { name, price, quantity, available } = req.body;

    const newProduct = new Product({
      name,
      price: Number(price) || undefined,
      quantity: Number(quantity) || undefined,
      userId: req.user?.userId,
      available: available,
    });
    await newProduct.save();

    res.status(201).json({
      message: "Product successfully created!",
      product: newProduct,
    });
  }
);

export const getProduct = asyncWrapper(
  async (req: RequestAuthType, res: Response, _next: NextFunction) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    res.status(200).json({
      message: "Product successfully retrieved!",
      product,
    });
  }
);

export const editProduct = asyncWrapper(
  async (req: RequestAuthType, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const { name, price, quantity, available } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: productId, userId: req.user?.userId },
      {
        name,
        price: Number(price) || undefined,
        quantity: Number(quantity) || undefined,
        available: available,
      },
      { new: true }
    );

    if (!product) {
      return next(createError("You cannot edit this product", 403));
    }

    res.status(200).json({
      message: "Product successfully updated!",
      product,
    });
  }
);

export const deleteProduct = asyncWrapper(
  async (req: RequestAuthType, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const product = await Product.findOneAndDelete({
      _id: productId,
      userId: req.user?.userId,
    });

    if (!product) {
      return next(createError("You cannot delete this product", 403));
    }

    res.status(200).json({
      message: "Product successfully deleted!",
      product,
    });
  }
);
