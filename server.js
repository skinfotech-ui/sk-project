const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "skinfotech156@gmail.com",
    pass: "frtp hqae ndck lqhh",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
// Middleware
app.use(cors());
app.use(bodyParser.json());

// API route
app.post("/contact", (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: "All required fields missing" });
  }

  console.log("New Contact Request:");
  console.log({ name, email, phone, service, message });

  const mailOptions = {
    from: "skinfotech156@gmail.com",
    to: "skinfotech156@gmail.com",
    subject: "New Contact Request",
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Message: ${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log("EMAIL ERROR:", error);  // 👈 ADD THIS
    return res.status(500).json({ msg: "Email failed" });
  } else {
    console.log("Email sent:", info.response);
    return res.status(200).json({ msg: "Success" });
 }
});
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
