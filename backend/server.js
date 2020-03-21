const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
  const trackingSchema = mongoose.Schema(
    {
      description: { type: String, required: true },
      datetime: { type: Date, required: true },
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
      elevation: { type: Number, required: true }
    },
    {
      timestamps: true
    }
  );

  var Tracking = mongoose.model("tracking", trackingSchema, "trackings");
  var trackings = [
    {
      id: "1",
      description: "Cesna 120",
      datetime: "2016-10-12T12:00:00-05:00",
      longitude: "43.2583264",
      latitude: "-81.8149807",
      elevation: "500"
    },
    {
      id: "1",
      description: "Cesna 120",
      datetime: "2016-10-13T12:00:00-05:00",
      longitude: "42.559112",
      latitude: "-79.286693",
      elevation: "550"
    },
    {
      id: "1",
      description: "Cesna 120",
      datetime: "2016-10-14T12:00:00-05:00",
      longitude: "43.559112",
      latitude: "-85.286693",
      elevation: "600"
    },
    {
      id: "1",
      description: "Cesna 120",
      datetime: "2016-10-15T12:00:00-05:00",
      longitude: "42.3119735",
      latitude: "-83.0941179",
      elevation: "650"
    },
    {
      id: "2",
      description: "DC-6 Twin Otter",
      datetime: "2016-10-12T12:00:00-05:00",
      longitude: "43.459112",
      latitude: "-80.386693",
      elevation: "500"
    },
    {
      id: "2",
      description: "DC-6 Twin Otter",
      datetime: "2016-10-13T12:00:00-05:00",
      longitude: "42.459112",
      latitude: "-79.386693",
      elevation: "450"
    },
    {
      id: "2",
      description: "DC-6 Twin Otter",
      datetime: "2016-10-14T12:00:00-05:00",
      longitude: "43.459112",
      latitude: "-85.386693",
      elevation: "400"
    },
    {
      id: "2",
      description: "DC-6 Twin Otter",
      datetime: "2016-10-15T12:00:00-05:00",
      longitude: "44.459112",
      latitude: "-81.386693",
      elevation: "500"
    },
    {
      id: "3",
      description: " Piper M600",
      datetime: "2016-10-15T12:00:00-05:00",
      longitude: "44.459112",
      latitude: "-81.386693",
      elevation: "500"
    },
    {
      id: "3",
      description: " Piper M600",
      datetime: "2016-10-15T12:00:00-05:00",
      longitude: "45.459112",
      latitude: "-82.386693",
      elevation: "600"
    },
    {
      id: "3",
      description: " Piper M600",
      datetime: "2016-10-15T12:00:00-05:00",
      longitude: "46.459112",
      latitude: "-83.386693",
      elevation: "700"
    },
    {
      id: "3",
      description: " Piper M600",
      datetime: "2016-10-15T12:00:00-05:00",
      longitude: "47.459112",
      latitude: "-84.386693",
      elevation: "800"
    },
    {
      id: "3",
      description: " Piper M600",
      datetime: "2016-10-15T12:00:00-05:00",
      longitude: "48.459112",
      latitude: "-85.386693",
      elevation: "900"
    },
    {
      id: "4",
      description: "Art Boom 6500",
      datetime: " 2017-08-04T14:20:38-05:00",
      longitude: "43.7634618",
      latitude: "-79.3688191",
      elevation: "800"
    },
    {
      id: "4",
      description: "Art Boom 6501",
      datetime: " 2017-08-04T16:20:38-05:00",
      longitude: "43.8001468",
      latitude: "-79.2342365",
      elevation: "800"
    },
    {
      id: "4",
      description: "Art Boom 6502",
      datetime: " 2017-08-04T14:20:38-05:00",
      longitude: "44.51165",
      latitude: "-80.1239422",
      elevation: "400"
    },
    {
      id: "4",
      description: "Art Boom 6503",
      datetime: " 2017-08-04T14:20:38-05:00",
      longitude: "43.1501439",
      latitude: "-79.0504945",
      elevation: "300"
    }
  ];
  // Use Below collection to intitaload data used for when testing front end
  Tracking.collection.insert(trackings, function(err, docs) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Multiple trackings inserted to Collection");
    }
  });
});
const trackingsRouter = require("./routes/trackings");

app.use("/trackings", trackingsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
