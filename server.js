const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/contact", async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "skinfotech156@gmail.com",
        pass: "ptle gfvr hesx xcme",
      },
    });

    const mailOptions = {
      from: email,
      to: "skinfotech156@gmail.com",
      subject: "New Contact Request",
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ msg: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Email sending failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
