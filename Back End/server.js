const express = require("express");
const app = express();
const cors = require("cors");

//create mysql connection
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test_schema",
});
app.use(cors());

//define port
const port = 9000;

app.get("/", (req, res) => {
  res.json({ message: "Root page" });
});

//get all contact data example
app.get("/get-all-controls", (request, response) => {
  connection.query("SELECT * FROM new_table", (err, rows) => {
    if (err) throw err;

    response.json({ data: rows });
  });
});

//run the application
app.listen(port, () => {
  console.log(`running at port ${port}`);
});
