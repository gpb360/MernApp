const router = require("express").Router();
let Tracking = require("../tracking.model");

router.route("/").get((req, res) => {
  Tracking.find()
    .then(trackings => res.json(trackings))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const description = req.body.description;
  const longitude = Number(req.body.longitude);
  const latitude = Number(req.body.latitude);
  const elevation = Number(req.body.elevation);
  const datetime = Date.parse(req.body.datetime);

  const newTracking = new Tracking({
    description,
    longitude,
    latitude,
    elevation,
    datetime
  });

  newTracking
    .save()
    .then(tracking => res.json(tracking))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Tracking.findById(req.params.id)
    .then(trackings => res.json(trackings))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Tracking.findByIdAndDelete(req.params.id)
    .then(() => res.json("Tracking deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Tracking.findById(req.params.id)
    .then(tracking => {
      tracking.description = req.body.description;
      tracking.longitude = Number(req.body.longitude);
      tracking.latitude = Number(req.body.latitude);
      tracking.elevation = Number(req.body.elevation);
      tracking.datetime = Date.parse(req.body.datetime);
      tracking
        .save()
        .then(tracking => res.json(tracking))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
