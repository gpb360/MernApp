const router = require("express").Router();
let Product = require("../product.model");

router.route("/").get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const description = req.body.description;
  const longitude = Number(req.body.longitude);
  const latitude = Number(req.body.latitude);
  const elevation = Number(req.body.elevation);
  const datetime = Date.parse(req.body.datetime);

  const newProduct = new Product({
    description,
    longitude,
    latitude,
    elevation,
    datetime
  });

  newProduct
    .save()
    .then(product => res.json(product))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then(products => res.json(products))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json("Product deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      product.description = req.body.description;
      product.longitude = Number(req.body.longitude);
      product.latitude = Number(req.body.latitude);
      product.elevation = Number(req.body.elevation);
      product.datetime = Date.parse(req.body.datetime);
      product
        .save()
        .then(product => res.json(product))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
