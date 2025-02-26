import nodemailer from "nodemailer";
async function sendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "seemafahmawe2000@gmail.com",
      pass: "ptrf otde mcbl xcze",
    },
  });

  const info = await transporter.sendMail({
    from: `"ums" <seemafahmawe2000@gmail.com>`, // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });
}

export default sendEmail;
