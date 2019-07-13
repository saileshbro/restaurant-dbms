require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
const port = process.env.PORT || 3000;
app.use("/api", require("./routes/signup"));
app.use("/api", require("./routes/import"));
app.use("/api", require("./routes/login"));
app.use("/order", require("./routes/order"));
app.use("/food", require("./routes/food"));
app.get("/", (req, res) => {
  res.send("hell");
});
app.listen(port, () => {
  console.log(`Server listening at post ${port}`);
});
