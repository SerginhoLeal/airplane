"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (link, service, token) => {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: '72100770@aluno.faculdadecotemig.br',
            pass: '96321458xz',
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    await transporter.sendMail({
        from: '"email empresarial" <foo@example.com>',
        to: "sergiojunioleal@hotmail.com",
        subject: `${service.title}`,
        text: "plain text body",
        html: `<a href="file:///C:/Users/sergio.leal/Desktop/Ruan/index.html">Visualizar o pedido</a>`,
    });
};
exports.sendEmail = sendEmail;
