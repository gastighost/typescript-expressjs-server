import express from "express";
const router = express.Router();

import auth from "../middleware/auth";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
} from "../controllers/product-controller";
import { check } from "express-validator";

router.use(auth);

router.get("/", getProducts);

router.post(
  "/",
  [
    check("name")
      .trim()
      .exists({ checkFalsy: true })
      .withMessage("Please include a name."),
    check("price").isFloat().toFloat().withMessage("Price should be a number"),
    check("quantity")
      .isInt()
      .toInt()
      .withMessage("Quantity should be a number"),
    check("available")
      .isBoolean()
      .toBoolean()
      .withMessage("Available should be either true or false"),
    check("date")
      .toDate()
      .isISO8601()
      .bail()
      .customSanitizer((date: Date) => date.toLocaleString("en-US"))
      .withMessage("Date should be a valid format"),
  ],
  createProduct
);

router.get("/:productId", getProduct);

router.patch(
  "/:productId",
  [
    check("name")
      .optional()
      .trim()
      .exists({ checkFalsy: true })
      .withMessage("Please include a name."),
    check("price")
      .optional()
      .isFloat()
      .toFloat()
      .withMessage("Price should be a number"),
    check("quantity")
      .optional()
      .isInt()
      .toInt()
      .withMessage("Quantity should be a number"),
    check("available")
      .optional()
      .isBoolean()
      .toBoolean()
      .withMessage("Available should be either true or false"),
    check("date")
      .optional()
      .toDate()
      .isISO8601()
      .bail()
      .customSanitizer((date: Date) => date.toLocaleString("en-US"))
      .withMessage("Date should be a valid format"),
  ],
  editProduct
);

router.delete("/:productId", deleteProduct);

export default router;
