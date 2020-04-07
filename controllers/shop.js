const Product = require("../models/product");
const Order = require("../models/order");

const getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("shop/product-list", {
        products: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch(() =>
      console.log(
        "Error while fetching all the product .. At getProducts controller"
      )
    );
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render("shop/product-list", {
  //       products: rows,
  //       pageTitle: "All Products",
  //       path: "/products"
  //     });
  //   })
  //   .catch(err => console.log(err));
  // Product.fetchAll(products => {
  //   res.render("shop/product-list", {
  //     products,
  //     pageTitle: "All Products",
  //     path: "/products"
  //   });
  // });
};

const getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findAll({
    where: {
      id: prodId,
    },
  })
    .then((products) => {
      res.render("shop/product-detail", {
        pageTitle: "Product Detail",
        path: "/products",
        product: products[0],
      });
    })
    .catch(() =>
      console.log(
        "Error while fetching all the product .. At getIndex controller"
      )
    );

  // Product.findById(prodId).then(([product]) => {
  //   const pageTitle = "Product Detail";
  //   const path = "/products";
  //   res.render("shop/product-detail", { pageTitle, path, product: product[0] });
  // });
  // , product => {
  //   const pageTitle = "Product Detail";
  //   const path = "/products";
  //   res.render("shop/product-detail", { pageTitle, path, product });
  // });
};

const getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        products: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch(() =>
      console.log(
        "Error while fetching all the product .. At getIndex controller"
      )
    );
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render("shop/index", {
  //       products: rows,
  //       pageTitle: "Shop",
  //       path: "/"
  //     });
  //   })
  //   .catch(err => console.log(err));
  // Product.fetchAll(products => {
  //   res.render("shop/index", {
  //     products,
  //     pageTitle: "Shop",
  //     path: "/"
  //   });
  // });
};

const getCart = (req, res, next) => {
  req.user.getCart().then((cart) => {
    cart.getProducts().then((products) => {
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: products,
      });
    });
  });
};

const postCart = (req, res, next) => {
  const prodId = req.body.productId;
  var fetchedCart;
  var newQty = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      if (product) {
        console.log(
          "*************************************************************************************",
          product.cartItem.quantity
        );
        newQty = product.cartItem.quantity + 1;
        return product;
      } else {
        return Product.findByPk(prodId);
      }
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQty },
      });
    })
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
};
const postRemoveCart = (req, res, next) => {
  const prodId = req.body.id;
  var fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      if (product) {
        if (product.cartItem.quantity == 1) {
          return fetchedCart.removeProduct(product);
        } else {
          return fetchedCart.addProduct(product, {
            through: { quantity: product.cartItem.quantity - 1 },
          });
        }
      }
    })
    .then(() => res.redirect("/cart"));
};
const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

const PostOrder = (req, res) => {
  var fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user.createOrder().then((order) => {
        order.addProducts(
          products.map((product) => {
            product.orderItem = { quantity: product.cartItem.quantity };
            return product;
          })
        );
      });
    })
    .then((orders) => {
      return fetchedCart.setProducts(null);
    })
    .then(() => {
      res.statusCode = 307;
      res.redirect("/orders");
    });
};
const getOrders = (req, res, next) => {
  return req.user.getOrders({ include: ["products"] }).then((orders) => {
    console.log(orders);
    res.render("shop/orders", {
      pageTitle: "Your Order",
      path: "/orders",
      orders,
    });
  });
};

module.exports = {
  PostOrder,
  postRemoveCart,
  postCart,
  getProduct,
  getOrders,
  getIndex,
  getProducts,
  getCart,
  getCheckout,
};
