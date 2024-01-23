const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
dotEnv.config();
mongoose.connect(process.env.MONGODB_ADDRESS).then(() => {
  console.log("Connected to database");
  app.listen(process.env.NODE_ENV, (e) => {
    console.log("listening", process.env.NODE_ENV);
  });
}).catch((error) => {
  console.log("DB failed to connect " + error);
});
