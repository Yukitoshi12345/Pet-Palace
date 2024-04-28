const db = require("./connection");
const {} = require("../models"); // add models inside the bracket
const cleanDB = require("./cleanDB");

// TODO: Complete section
db.once("open", async () => {
  console.log("products seeded");

  console.log("users seeded");

  process.exit();
});
