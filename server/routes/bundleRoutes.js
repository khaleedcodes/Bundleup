import express from "express";
import {
  getBitsInBundle,
  addBitToBundle,
  getPublicBundle,
  deleteBitFromBundle,
  updateBitInBundle,
} from "../controllers/bundleController.js";
import protectRoute from "../middlewares/authMiddleware.js";

const bundleRoutes = express.Router();

bundleRoutes.post("/me/bits", protectRoute, addBitToBundle);
bundleRoutes.get("/me/bits", protectRoute, getBitsInBundle);
bundleRoutes.patch("/me/bits/:bitId", protectRoute, updateBitInBundle);
bundleRoutes.delete("/me/bits/:bitId", protectRoute, deleteBitFromBundle);
bundleRoutes.get("/:username", getPublicBundle);

export default bundleRoutes;
