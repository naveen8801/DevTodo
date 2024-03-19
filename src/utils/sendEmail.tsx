// @ts-ignore
import * as nodemailer from "nodemailer";
import { render } from "@react-email/render";
import WelcomeEmail from "./emailTemplates/WelcomeEmail";
import * as React from "react";

/**
 * Returns the email subject based on the type.
 *
 * @param {string} type - The type of email subject. Can be "WELCOME" or "WEEKLY_REPORT".
 * @return {string} The email subject based on the type.
 */
const getEmailSubjectBasedOnType = (type: "WELCOME" | "WEEKLY_REPORT") => {
  switch (type) {
    case "WELCOME":
      return "Welcome to DevTodo 🚀";
    case "WEEKLY_REPORT":
      return "DevTodo Weekly Report";
    default:
      return "";
  }
};

/**
 * Generates an email body based on the type provided.
 *
 * @param {any} data - the data object containing information for the email
 * @param {"WELCOME" | "WEEKLY_REPORT"} type - the type of email to generate
 * @return {any} the email body corresponding to the type provided
 */
const getEmailBodyBasedOnType = (
  data: any,
  type: "WELCOME" | "WEEKLY_REPORT"
): any => {
  switch (type) {
    case "WELCOME":
      const { name } = data;
      return render(<WelcomeEmail name={name} />);
    case "WEEKLY_REPORT":
      return "DevTodo Weekly Report";
    default:
      return "";
  }
};

const generateMailData = (emailPayload: any) => {
  const { receiverEmail, data, emailType } = emailPayload;
  const { email } = data;

  if (!email) {
    throw new Error("Invalid receiver email");
  }

  // Get email template based on emailType
  const emailHtml = getEmailBodyBasedOnType(data, emailType);

  // Get email subject based on emailType
  const subject = getEmailSubjectBasedOnType(emailType);

  const mailOptions = {
    from: process.env.EMAIL,
    to: receiverEmail,
    html: emailHtml,
    subject: subject,
  };

  return { mailOptions };
};

exports.sendEmail = async (emailPayload: any) => {
  const { receiverEmail, receiverName, data, emailType } = emailPayload;

  if (!receiverEmail || !receiverName || !data || !emailType) {
    return {
      error: "Receiver's email, email type & data not passed correctly",
    };
  } else {
    let { mailOptions } = generateMailData(emailPayload);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
          throw new Error(error);
        } else {
          return { msg: "Email sent successfully" };
        }
      });
    });
  }
};
