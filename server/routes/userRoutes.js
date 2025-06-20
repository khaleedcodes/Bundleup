import express from "express";
import { getUserAvatar, updateUser } from "../controllers/userController.js";
import protectRoute from "../middlewares/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.patch("/me", protectRoute, updateUser);
userRoutes.get("/me", protectRoute, getUserAvatar);

export default userRoutes;
