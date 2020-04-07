const Cart = require("./cart");
const Sequelize = require("sequelize").Sequelize;
const sequelize = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// class Product {
//   constructor(title, imageUrl, price, description) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }
//   save() {
//     return db.execute(
//       `INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)`,
//       [this.title, this.price, this.imageUrl, this.description]
//     );
//   }
//   static fetchAll() {
//     return db.execute("SELECT * FROM products");
//     // readContent(cb);
//   }
//   static findById(id) {
//     return db.execute(`SELECT * FROM products WHERE id=${id}`);
//     // readContent(products => {
//     //   const product = products.find(product => {
//     //     if (product.id === id) return product;
//     //   });
//     //   cb(product);
//     // });
//   }
//   static deleteById(id, cb) {
//     readContent(products => {
//       const productIndex = products.findIndex(product => {
//         if (product.id === id) return product;
//       });
//       if (products[productIndex]) {
//         products.splice(productIndex, 1);
//         Cart.deleteById(id, true, () => {
//           writeContent(products, cb);
//         });
//       } else {
//         cb();
//       }
//     });
//   }

//   static editById(id, product, cb) {
//     readContent(products => {
//       var productIndex = products.findIndex(p => p.id == id);
//       var oldProduct = products[productIndex];
//       if (oldProduct) {
//         products[productIndex] = { ...product, id };
//       }
//       writeContent(products, cb);
//     });
//   }
// }

// const readContent = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     let products = [];
//     if (!err) {
//       products = JSON.parse(fileContent);
//     }
//     cb(products);
//   });
// };

// const writeContent = (products, cb) => {
//   fs.writeFile(p, JSON.stringify(products), err => {
//     if (err) console.log("Error while writing File");
//     else {
//       if (cb) cb();
//     }
//   });
// };

module.exports = Product;
