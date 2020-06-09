const fs = require("fs");
const { Readable } = require("stream");

const express = require("express");
const trackRoute = express.Router();

/**
 * Create Express server and routes
 */
const app = express();
app.use("/track", trackRoute);

/**
 * GET /tracks/:trackID
 */
trackRoute.get("/:trackID", (req, res) => {
  res.set("content-type", "audio/mp3");
  res.set("accept-ranges", "bytes");

  const fileStream = fs.createReadStream("./kaytestnada.mp3");

  fileStream.pipe(res);
});

app.listen(3005, () => {
  console.log("istening on port 3005");
});
