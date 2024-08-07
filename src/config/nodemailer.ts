import nodemailer from 'nodemailer';

type Props = {
  to: string;
  subject: string;
  otp: string;
};

export const sendMail = async (props: Props) => {
  console.log("Nodemailer started working")
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
    from: 'dummycoding411@gmail.com',
    to: props.to,
    subject: props.subject,
    html: `
      <h1>Otp for login</h1>
      <p>Your OTP is: ${props.otp}</p>
    `,
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