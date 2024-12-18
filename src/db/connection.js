const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mini-full-pro")
  .then(() => {
    console.log("Database is connected locally");
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
