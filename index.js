const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const crud = require("./routes/crud.js");
require('dotenv').config();
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/assets/uploads", express.static(__dirname + "/assets/uploads"));

app.use("/crud",crud);

app.use((req, res, next) => {
    /*  res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, 
      Accept, x-client-key, x-client-token, x-client-secret, Authorization");*/
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *");
      if (req.method === "OPTIONS") {
          res.header(
              "Access-Control-Allow-Methods",
              "GET, PUT, POST, PATCH, DELETE, OPTIONS"
          );
          res.setHeader("Access-Control-Allow-Credentials", true);
          return res.status(200).json({});
      }
      next();
  });

app.get("/", (req,res) => {
    res.status(200).json({
        message: "hellooo from Crud app",
        url: `${req.protocol}://${req.get("host")}`,
    });
});

mongoose
    .connect(
        process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log("DB Connected!!!")

        app.listen( 8000, () =>
            console.log("Server started!!!")
        );
    })
    .catch((err) => {
        console.log(err);
    });