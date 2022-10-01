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

router.use(auth);

router.get("/", getProducts);

router.post("/", createProduct);

router.get("/:productId", getProduct);

router.patch("/:productId", editProduct);

router.delete("/:productId", deleteProduct);

export default router;
