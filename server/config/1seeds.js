const db = require("./connection");
const {} = require("../models"); // add models inside the bracket


// TODO: Complete section
db.once("open", async () => {
  console.log("products seeded");

  console.log("users seeded");

  process.exit();
});
