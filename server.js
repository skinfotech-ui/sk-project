const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// important middleware
app.use(cors());
app.use(express.json());

// test route (optional)
app.get("/", (req, res) => {
  res.send("server is running");
});

// API route
app.post("/contact", async (req, res) => {
const { name, email, phone, service, message } = req.body;
if (!name || !email || !message) {
    return res.status(400).json({ msg: "All Required fields missing" });
}
try {
  const transporter= nodemailer.createTransport({ service: "gmail", 
auth: {
user: "skinfotech156@gmail.com",
pass: "sbzt crqr uksd hmhv"
}
});
await transporter.sendMail({
from: email,
to: "skinfotech156@gmail.com",
subject: "New Service Request",
text: `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Service: ${service}
    Message: ${message}
   `
});
res.json({msg: "email sent Successfully" });
}
 catch (error) {
console.error(error);
res.status(500).json({ msg: "Error sending email" });
}
});

// Start server PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on PORT " + PORT);
});