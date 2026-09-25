import nodemailer from "nodemailer";
import handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import dotenv from "dotenv"
import fs from 'fs';
import path from 'path';

dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendSignUpNotification = async (user) => {

  const templatePath = path.join(__dirname, 'signUpNotification.hbs');
  const source = fs.readFileSync(templatePath, 'utf8').toString();
  const template = handlebars.compile(source);

  const data = {
    name: user?.fullname,
    username: user?.username,
    actionUrl: "https://oluwafemim.vercel.app"
  };

  const htmlToSend = template(data);

  const mailOptions = {
    from: `NH Tech Team: <${process.env.EMAIL_USER}>`,
    to: user?.email,
    subject: 'Creation of new account',
    html: htmlToSend,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email failed to send:', error);
  }
};

export const sendLoginNotification = async (user) => {
  const templatePath = path.join(__dirname, 'loginNotification.hbs');
  const source = fs.readFileSync(templatePath, 'utf8').toString();
  const template = handlebars.compile(source);

  const data = {
    name: user?.fullname,
    date: new Date().toLocaleString(),
    location: user?.center,
    actionUrl:"https://oluwafemim.vercel.app"
  };

  const htmlToSend = template(data);

  const mailOptions = {
    from: `"NH Security Team" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'New Login Detected',
    html: htmlToSend,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email failed to send:', error);
  }
};