import { text } from "express";
import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (Options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "task manager",
      link: "https://taskmangelink.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(Options.mailgenContent);
  const emailHtml = mailGenerator.generate(Options.mailgenContent);

  const transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "rmd09181@gmail.com",
    to: Options.email,
    subject: Options.subject,
    text: Options.emailTextual,
    html: Options.emailHtml,
  };

  try {
    await transporter.sendEmail(mail);
  } catch (error) {
    console.error("your email service failed silenty");
  }
};


const emailVerificationMailgenContent = (userName,VerifationUrl)=>{
    return {
      body: {
        name: userName,
        intro: "Welcome to Mailgen! We're very excited to have you on board.",
        action: {
          instructions: "To get started with Mailgen, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: VerifationUrl,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
};

const forgotPasswordmailgenContent = (userName,passwordResetUrl)=>{
    return {
      body: {
        name: userName,
        intro: "we got a request to reset of youre account password",
        action: {
          instructions: "To reset your password click on following button",
          button: {
            color: "#bc2722",
            text: "Reset your password",
            link: passwordResetUrl,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
};

export {emailVerificationMailgenContent,forgotPasswordmailgenContent,sendEmail}