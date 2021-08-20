const functions = require("firebase-functions");
const express = require("express");
const sgMail = require("@sendgrid/mail");

const cors = require("cors");

const app = express();
app.use(cors({origin: true, credentials: true}));

// constants
const destinationEmail = functions.config().sendgrid.destination_email;
const verfiedSenderEmail = functions.config().sendgrid.verfied_sender_email;

app.get("/sayhi", (_, res) => {
  console.log("Request to /sayhi endpoint received. Hello!");
  res.status(200).send("success");
});

app.post("/sendemail", (req, res) => {
  sgMail.setApiKey(functions.config().sendgrid.apikey);

  const {
    fullname,
    email,
    subject,
    message,
  } = JSON.parse(req.body);
  sgMail.send(constructMsgObj(fullname, email, subject, message))
      .then(() => {
        console.log(`Email on behalf of ${email} sent successfully`);
        res.status(200).send("success");
      })
      .catch((error) => {
        console.error(`Failure to send email on behalf of ${email}`);
        console.error(error);
        console.error(error.response.body.errors);
        res.status(400).send("fail");
      });
});

const constructMsgObj = (fullname, email, subject, message) => {
  const msgObj = {
    reply_to: email,
    to: destinationEmail,
    from: verfiedSenderEmail,
    subject: `Customer Inquiry from ${fullname}: ${subject}`,
    text: message,
  };
  return msgObj;
};

exports.api = functions.https.onRequest(app);
