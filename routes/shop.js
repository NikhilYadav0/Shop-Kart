const express = require("express");
const router = express.Router();

const shop = require("../controllers/shop");
router.get("/", shop.getIndex);
router.get("/products", shop.getProducts);
router.get("/cart", shop.getCart);
router.post("/cart", shop.postCart);
router.post("/removeFromCart", shop.postRemoveCart);
router.get("/orders", shop.getOrders);
router.post("/create-order", shop.PostOrder);
router.get("/checkout", shop.getCheckout);
router.get("/products/:productId", shop.getProduct);
module.exports = router;
