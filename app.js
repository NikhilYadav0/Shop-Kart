const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorCtrl = require("./controllers/404");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

// app.set("view engine", "pug");
// app.set("views", "views/pugs-files");

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoutes);
app.use("/admin", adminRoutes);

app.use(errorCtrl);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });

Cart.hasMany(CartItem);
Order.belongsTo(User);
User.hasMany(Order);
Product.belongsToMany(Order, { through: OrderItem });
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Nikhil", email: "nikhily.25@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    user.getCart().then((cart) => {
      if (cart) return cart;
      else {
        return user.createCart();
      }
    });
  })
  .then((cart) => app.listen(3000))
  .catch((err) => console.log(err));
