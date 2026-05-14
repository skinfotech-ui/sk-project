const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

const resend = new Resend(process.env.RESEND_API_KEY);

// middleware
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("server is running");
});

// contact route
app.post("/contact", async (req, res) => {

  const { name, email, phone, service, message } = req.body;

  console.log("Request Body:", req.body);

  try {

    await resend.emails.send({

      from: "onboarding@resend.dev",

      to: "skinfotech156@gmail.com",

      subject: "New Service Request",

      html: `
        <h2>New Service Request</h2>

        <p><b>Name:</b> ${name}</p>

        <p><b>Email:</b> ${email}</p>

        <p><b>Phone:</b> ${phone}</p>

        <p><b>Service:</b> ${service}</p>

        <p><b>Message:</b> ${message}</p>
      `
    });

    console.log("Mail sent successfully");

    res.status(200).json({
      success: true,
      message: "Mail sent successfully"
    });

  } catch (error) {

    console.log("RESEND ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error sending email"
    });

  }

});

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});