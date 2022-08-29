const express = require("express");
const bodyParser = require("body-parser");
const con = require("./config/ConnectDB");
const cors = require("cors");
const path = require("path");
const app = express();
const useRouter = require("./router/index");
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

con.connect(function (err) {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});
app.use(express.json());
app.use(cors());

app.use("/", useRouter);
app.use("/home", express.static(path.join(__dirname, "view")));
app.listen(port, () => console.log(`Listening on port ${port}`));
