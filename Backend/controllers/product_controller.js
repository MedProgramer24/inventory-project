// controllers/productController.js

import mongoose from "mongoose";
import HistoryModel from "../models/history_model.js";
import LocationModel from "../models/locations_models.js";
import Product from "../models/product_model.js";

export const createProduct = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "not authorized" });
  }
  try {
    const {
      locationId,
      status,
      title,
      description,
      serialNo,
      rackMountable,
      isPart,
      manufacturer,
      model,
      warrantyMonths,
      dateOfPurchase,
      user,
    } = req.body;

    const history = new HistoryModel({
      location: locationId,
      status: [
        {
          name: status,
        },
      ],
    });

    await history.save();

    const product = new Product({
      title,
      description,
      serialNo,
      dateOfPurchase,
      createdBy: req.user._id,
      rackMountable,
      isPart,
      manufacturer,
      model,
      warrantyMonths,
      user,
      history: [history._id],
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      itemsperpage = 10,
      search = "",
      manufacturer,
    } = req.query;

    let regex = new RegExp(search, "i");

    const query = {
      $or: [
        { title: regex },
        { description: regex },
        { serialNo: regex },
        { model: regex },
      ],
    };

    if (manufacturer) {
      query.manufacturer = mongoose.Types.ObjectId(manufacturer);
    }

    const skipItems = (page - 1) * itemsperpage;

    const totalCount = await Product.countDocuments(query);
    const pages_count = Math.ceil(totalCount / itemsperpage);

    const products = await Product.find(query)
      .skip(skipItems)
      .limit(parseInt(itemsperpage))
      .populate({
        path: "history",
        populate: {
          path: "location",
        },
      })
      .populate("manufacturer");

    res.status(200).json({
      data: products,
      pages_count,
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("createdBy")
      .populate({
        path: "history",
        populate: {
          path: "location",
        },
      })
      .populate("manufacturer");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get product history (renamed from getProductHistroy)
export const getProductHistory = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("createdBy")
      .populate({
        path: "history",
        populate: {
          path: "location",
        },
      })
      .populate("manufacturer");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a product by ID
export const updateProductById = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "not authorized" });
  }

  const productId = req.params.id;
  try {
    const {
      locationId,
      status,
      title,
      description,
      serialNo,
      createdBy,
      rackMountable,
      isPart,
      manufacturer,
      model,
      warrantyMonths,
      user,
    } = req.body;

    // Build product update object and remove undefined fields
    const productUpdate = {
      title,
      description,
      serialNo,
      createdBy,
      rackMountable,
      isPart,
      manufacturer,
      model,
      warrantyMonths,
      user,
    };
    Object.keys(productUpdate).forEach(
      (key) => productUpdate[key] === undefined && delete productUpdate[key]
    );

    if (locationId) {
      // Create a new history entry for the location change
      const history = new HistoryModel({
        location: locationId,
        status: [{ name: status }],
      });
      await history.save();

      // Update product info and add new history
      await Product.findByIdAndUpdate(productId, {
        $set: productUpdate,
        $push: { history: history._id },
      });
    } else if (status) {
      // Add a new status entry to the first history
      const productRes = await Product.findById(productId);
      if (!productRes) {
        return res.status(404).json({ error: "Product not found" });
      }

      const historyId = productRes.history[0];
      const his = await HistoryModel.findById(historyId);
      if (!his) {
        return res.status(404).json({ error: "History not found" });
      }

      his.status.push({ name: status });
      await his.save();

      await Product.findByIdAndUpdate(productId, { $set: productUpdate });
    } else {
      // Just update product fields
      await Product.findByIdAndUpdate(productId, { $set: productUpdate });
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to delete a product by ID
export const deleteProductById = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "not authorized" });
  }
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
