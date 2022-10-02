import express from "express";
const router = express.Router();

import auth from "../middleware/auth";

import {
  getUsers,
  createUser,
  getUser,
  editUser,
  deleteUser,
  login,
  checkAuth,
} from "../controllers/user-controller";

router.get("/", getUsers);

router.post("/", createUser);

router.get("/:userId", getUser);

router.patch("/:userId", editUser);

router.delete("/:userId", deleteUser);

router.post("/login", login);

router.get("/login/check-auth", auth, checkAuth);

export default router;
