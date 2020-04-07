const Product = require("../models/product");
const User = require("../models/user");
// const db = require("../util/database");
const getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product"
  });
};

const getEditProduct = (req, res, next) => {
  req.user.getProducts({ where: { id: productId } }).then(products => {
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      product: products[0]
    });
  });
};

const postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.findByPk(id).then(product => {
    product.title = title;
    product.imageUrl = imageUrl;
    product.price = price;
    product.description = description;
    product
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch(() => console.log("Not Able To Edit Some Error Occured"));
  });
};

const postDeleteProduct = (req, res, next) => {
  // Delete First From Cart then delete from Product
  Product.destroy({ where: { id: req.body.id } })
    .then(() => {
      console.log(`${req.body.id} Product deleted`);
      res.redirect("/admin/products");
    })
    .catch(err => console.log(`Not Able to delete Product`));
};

const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title,
      imageUrl,
      price,
      description
    })
    .then(() => {
      console.log("Product added to db");
      res.redirect("/");
    })
    .catch(err =>
      console.log(
        "Error While adding product to db {{ postAddProduct controller}}"
      )
    );
  // const product = new Product(title, imageUrl, price, description);
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch(err => console.log(err));
};

const getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then(products => {
      res.render("admin/products", {
        products,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch(() =>
      console.log(
        "Error while fetching all the product .. At getProducts controller"
      )
    );
};
module.exports = {
  postDeleteProduct,
  postEditProduct,
  getProducts,
  getAddProduct,
  getEditProduct,
  postAddProduct
};
