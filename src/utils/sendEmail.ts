// @ts-ignore
import * as nodemailer from "nodemailer";

const getEmailSubject = (type: "WELCOME" | "WEEKLY_REPORT") => {
  switch (type) {
    case "WELCOME":
      return "Welcome to DevTodo 🚀";
    case "WEEKLY_REPORT":
      return "DevTodo Weekly Report";
    default:
      return "";
  }
};

exports.sendEmail = async (emailPayload: any) => {
  const { receiverEmail, receiverName, data, emailType } = emailPayload;

  if (!receiverEmail || !receiverName || !data || !emailType) {
    return {
      error:
        "Receiver's email,Receiver's name, email type & data not passed correctly",
    };
  } else {
    // let { mailOptions, error } = generateMailData(emailPayload);
    // if (error) {
    //   return { error: error };
    // }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // await new Promise((resolve, reject) => {
    //   transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //       logger.debug(`Email not sent : ${error.toString()}`);
    //       return { error: error.toString() };
    //     } else {
    //       logger.debug(`Email sent`);
    //       logger.debug(info);
    //       return { msg: "Email sent successfully" };
    //     }
    //   });
    // });
  }
};
