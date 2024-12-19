const mongoose = require("mongoose");
const Database = process.env.DATABASE
const Database_name = process.env.DATABASE_NAME

mongoose.connect(`${Database}/${Database_name}`)
  .then(() => {
    console.log("Database is connected locally");
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
