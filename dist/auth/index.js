"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const model_1 = __importDefault(require("./model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authConfig = process.env.GERANDO_TOKEN_LISTENER;
function generateToken(params = {}) {
    return jsonwebtoken_1.default.sign(params, authConfig, {
        expiresIn: 86400
    });
}
class UserController {
    async login(req, res) {
        const { name, password } = req.body;
        try {
            const Auth = await model_1.default.findOne({ name }).select('+password');
            if (!Auth)
                return res.status(400).send({ error: 'falha na autenticação' });
            if (!await bcryptjs_1.default.compare(password, Auth.password))
                return res.status(400).send({ error: 'falha na autenticação' });
            Auth.password = undefined;
            return res.send({ Auth, token: generateToken({ id: Auth.id }) });
        }
        catch (e) {
            return res.status(400).send({ error: e });
        }
    }
    async create(req, res) {
        const { name, email, password, confPass, cpf, picture } = req.body;
        if (password !== confPass)
            return res.status(400).json({ password_fail: true });
        try {
            const create = await model_1.default.create({
                name,
                email,
                password,
                cpf,
                picture
            }).then(() => generateToken({ id: create.id }));
            if (create)
                return res.status(200).json({ success: true });
        }
        catch (err) {
            if (err.keyValue.email)
                return res.json({ email_in_use: true });
        }
    }
}
exports.UserController = UserController;
;
