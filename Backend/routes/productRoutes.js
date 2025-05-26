// routes/productRoutes.js

import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductHistory,  // Corrected spelling
} from "../controllers/product_controller.js";
import { isAuthenticated } from "../middlewares/user_auth.js";

const productRouter = express.Router();

// Create a new product
productRouter.post("/", isAuthenticated, createProduct);

// Get all products
productRouter.get("/", getAllProducts);

// Get a single product by ID
productRouter.get("/:id", getProductById);

// Get product history by ID
productRouter.get("/:id/history", getProductHistory);

// Update a product by ID
productRouter.put("/:id", isAuthenticated, updateProductById);

// Delete a product by ID
productRouter.delete("/:id", isAuthenticated, deleteProductById);

export default productRouter;
