const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// important middleware
app.use(cors());
app.use((req, res, next) => {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "*");
next();
});
app.use(express.json());

// test route (optional)
app.get("/", (req, res) => {
  res.send("server is running");
});

// API route
app.post("/contact", async (req, res) => {
const { name, email, phone, service, message } = req.body;
console.log("Request Body:", req.body);
try {
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 2525,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});
const mailOptions = {
from: process.env.BREVO_USER,
replyTo: email,
to:  process.env.BREVO_USER,
subject: "New Service Request",
text: `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Service: ${service}
    Message: ${message}
   `
};
transporter.sendMail(mailOptions, (error, info) =>
{
if(error) {
   console.log("MAIL ERROR FULL:", error);
   return res.status(500).json({
     success: false,
     message: "Error sending email"
     });
}
   console.log("Mail sent successfully");
    res.status(200).json({
    success: true,
    message: "Mail sent successfully"
});
});

} catch (error) {
 console.log("error");
 res.status(500).json({ success: false,
                        error: error.message 
});
}
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {  
    console.log(`Server running on PORT ${PORT}`);
});
