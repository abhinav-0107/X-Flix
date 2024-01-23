const express = require("express");
const httpStatus = require("http-status");
const { errorHandler } = require("./src/middlewares/error");
const app = express();
const cors = require("cors");
const routes = require("./src/routes/index");
const ApiError = require("./src/utils/ApiError");

app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use("/v1", routes);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// handle error
app.use(errorHandler);

module.exports = app;
