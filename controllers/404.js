module.exports = errorCtrl = (req, res) => {
  res.statusCode = 404;
  res.render("404", { pageTitle: "Page Not Found", path: req.url });
};
