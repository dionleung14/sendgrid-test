// Sets up the express app
const express = require("express");

const cors = require("cors");

// const mongojs = require("mongojs");
// const mongoose = require("mongoose");
// const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;
// const allRoutes = require("./controllers");

// Requiring our models for syncing
// const db = require("./models");

// Sets up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sgMail = require("@sendgrid/mail");

// developing
app.use(
  cors({
    options: ["http://localhost:3000/"],
  })
);

// deployed site
// app.use(
//   // cors({
//   //   options: ["https://dion-leung-portfolio.herokuapp.com/"],
//   // })
//   cors({
//     options: ["https://www.dionleung.engineer/"],
//   })
//   // cors({
//   //   options: [],
//   // })
// );

// Static directory
// app.use(express.static("public"));

// const exphbs = require("express-handlebars");
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// app.use("/", allRoutes);

app.get("/", (req, res) => {
  res.send(
    `This backend does not serve data, only handles nodemailer requests. My favorite pokemon is ${process.env.POKEMON}`
  );
});

app.get("/test", (req, res) => {
  sgMail.setApiKey(process.env.MAIL_API_KEY);
  const msg = {
    to: "dioncleung@gmail.com", // Change to your recipient
    from: "dion.leung.portfolio@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.status(200).send("hello");
    })
    .catch(error => {
      console.error(error);
      res.status(400).send("oh noes");
    });
});

app.listen(PORT, () => {
  console.log(`App is listening to smooth sounds on port ${PORT}`);
});
