const { response } = require("express");
const express = require("express");
const client = require("./database");
const port = 6000;
require("dotenv").config();
const paginatedResults = require("./paginateResults");
const app = express();

const getUsers = async () => {
  const data = await client.query("select * from person");
  return data;
};

//paginatedResults is a middleware to implement pagination it takes an object as an argument which should have two properties .
//  1.Name of the tabel you want to query.
//  2.The client instence.
app.get(
  "/persons",
  paginatedResults({ tabel: "person", client }),
  async (req, res) => {
    try {
      res.status(200).json(res.paginatedResults);
    } catch (error) {
      console.log(error.message);
    }
  }
);

app.listen(port, () => {
  console.log(`listening on port:${port}`);
});
