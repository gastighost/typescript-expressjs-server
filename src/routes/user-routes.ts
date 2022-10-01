import express from "express";
const router = express.Router();

import {
  getUsers,
  createUser,
  getUser,
  editUser,
  deleteUser,
  login,
} from "../controllers/user-controller";

router.get("/", getUsers);

router.post("/", createUser);

router.get("/:userId", getUser);

router.patch("/:userId", editUser);

router.delete("/:userId", deleteUser);

router.post("/login", login);

export default router;
