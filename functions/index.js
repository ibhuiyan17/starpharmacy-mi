// const functions = require("firebase-functions");
const functions = require("firebase-functions");
const express = require("express");
const sgMail = require("@sendgrid/mail");

const cors = require("cors");

const app = express();
app.use(cors({origin: true, credentials: true}));

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

app.get("/sayhi", (req, res) => {
  console.log("hello!");
  res.status(200).send("success");
});

app.post("/sendmail", (req, res) => {
  sgMail.setApiKey(functions.config().sendgrid.apikey);
  // eslint-disable-next-line max-len

  const msg = {
    to: "ibtidab@gmail.com", // Change to your recipient
    from: "starpharmacymi.email@gmail.com", // Change to your verified sender
    subject: "Testing",
    text: "This is a test of the email feature.",
    // html: "This is a test of the email feature.</strong>",
  };
  sgMail.send(msg)
      .then(() => {
        console.log("Email sent");
        res.status(200).send("success");
      })
      .catch((error) => {
        console.error(error);
        console.error(error.response.body.errors);
        res.status(400).send("fail");
      });
});

exports.api = functions.https.onRequest(app);
