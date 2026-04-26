const express = require("express");
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
app.post("/contact", (req, res) => {
try {
  const { name, email, phone, service, message } = req.body;

// validation
   if (!name || !email || !message) {
     return res.status(400).json({ msg: "All required fields missing" });
  }
// print in console (check in render logs)
  console.log("New Contact Request:");
  console.log(req.body);

// Here you can save to DB or send email
  res.status(200).json({ msg: "Form submitted successfully" });

} catch (error) {
console.error(error);
res.status(500).json({ msg: "Server error" });
}
});

// Start server PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on PORT " + PORT);
});