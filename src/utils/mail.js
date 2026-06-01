import Mailgen from "mailgen";

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

export {emailVerificationMailgenContent,forgotPasswordmailgenContent}