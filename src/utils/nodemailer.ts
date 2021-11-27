import nodemailer from "nodemailer";

export const sendEmail = async(link, service, token) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: '72100770@aluno.faculdadecotemig.br',
      pass: '96321458xz',
    },
    tls:{
      rejectUnauthorized: false
    }
  });

  await transporter.sendMail({
    from: '"email empresarial" <foo@example.com>', // sender address
    to: "sergiojunioleal@hotmail.com", // list of receivers
    subject: `${service.title}`, // Subject line
    text: "plain text body", // plain text body
    html: `<a href="file:///C:/Users/sergio.leal/Desktop/Ruan/index.html">Visualizar o pedido</a>`, // html body
  });

  // console.log("Message sent: %s", info.messageId);

  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// sendEmail(n).catch(console.error);
