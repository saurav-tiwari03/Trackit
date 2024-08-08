import nodemailer from 'nodemailer';

type Props = {
  to: string;
  subject: string;
  html: string
};

export const sendMail = async (props: Props) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: 'dummycoding411@trackit.com',
    to: props.to,
    subject: props.subject,
    html: props.html,
  };


  try {
    const response = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    console.log(response.response);
  } catch (error) {
    console.error('Error sending email');
    console.log(error);
  }
};