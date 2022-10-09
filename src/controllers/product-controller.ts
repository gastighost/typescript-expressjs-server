/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestAuthType } from "../middleware/auth";

import asyncWrapper from "../utils/async-wrapper";
import createError, { createValidationError } from "../utils/custom-error";

import {
  createNewProduct,
  deleteAProduct,
  editAProduct,
  getAllProducts,
  getAProduct,
} from "../services/product-services";

export const getProducts = asyncWrapper(
  async (_req: RequestAuthType, res: Response, _next: NextFunction) => {
    const products = await getAllProducts();

    res
      .status(200)
      .json({ message: "Products successfully retrieved!", products });
  }
);

export const createProduct = asyncWrapper(
  async (req: RequestAuthType, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const validationError = createValidationError(errors.array());
      return next(createError(validationError, 400));
    }

    const { name, price, quantity, available, date } = req.body;

    const userId = req.user?.userId as string;

    const newProduct = await createNewProduct({
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
  }
);

export const getProduct = asyncWrapper(
  async (req: RequestAuthType, res: Response, _next: NextFunction) => {
    const { productId } = req.params;

    const product = await getAProduct(productId);

    res.status(200).json({
      message: "Product successfully retrieved!",
      product,
    });
  }
);

export const editProduct = asyncWrapper(
  async (req: RequestAuthType, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const validationError = createValidationError(errors.array());
      return next(createError(validationError, 400));
    }

    const { productId } = req.params;
    const { name, price, quantity, available, date } = req.body;
    const userId = req.user?.userId as string;

    const product = await editAProduct(productId, {
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
  }
);

export const deleteProduct = asyncWrapper(
  async (req: RequestAuthType, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const userId = req.user?.userId as string;

    const product = await deleteAProduct(productId, userId);

    res.status(200).json({
      message: "Product successfully deleted!",
      product,
    });
  }
);
