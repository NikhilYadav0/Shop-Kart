const express = require("express");
const router = express.Router();
const path = require("path");

const {
  postDeleteProduct,
  postEditProduct,
  getEditProduct,
  getAddProduct,
  postAddProduct,
  getProducts
} = require("../controllers/admin");

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

router.get("/products", getProducts);
router.get("/edit-product/:productId", getEditProduct);
router.post("/edit-product", postEditProduct);
router.post("/delete-product", postDeleteProduct);

module.exports = router;
