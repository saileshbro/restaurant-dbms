require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use("/api", require("./routes/food"));
app.listen(port, () => {
  console.log(`Server listening at post ${port}`);
});
