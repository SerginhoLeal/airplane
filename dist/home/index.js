"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const model_1 = __importDefault(require("./model"));
const nodemailer_1 = require("../utils/nodemailer");
class HomeController {
    async index(req, res) {
        const { filter } = req.query;
        const docs = await model_1.default.find().populate(["creator", "receiver"]);
        const filters = docs.filter(element => filter ? (element === null || element === void 0 ? void 0 : element.title) === filter : element);
        return res.json(filters);
    }
    async create(req, res) {
        const { title, description, value, } = req.body;
        try {
            const create = await model_1.default.create({
                title,
                description,
                creator: req.userId,
                receiver: null,
                value,
            });
            return res.json(create);
        }
        catch (err) {
            return (err);
        }
    }
    async update(req, res) {
        const { title, description, value, } = req.body;
        const service_update = await model_1.default.findById(req.params.id);
        if (String(service_update.creator) !== req.userId)
            return res.status(400).json({ is_not_you: true });
        try {
            await model_1.default.findByIdAndUpdate(req.params.id, {
                title,
                description,
                value,
            }, {
                new: true
            });
            return res.json({ success: true });
        }
        catch (error) {
        }
    }
    async delete(req, res) {
        const service_update = await model_1.default.findById(req.params.id);
        if (String(service_update.creator) !== req.userId)
            return res.status(400).json({ is_not_you: true });
        try {
            await model_1.default.findByIdAndRemove(req.params.id);
            return res.json({ success: true });
        }
        catch (error) {
            console.log(error);
        }
    }
    async email(req, res) {
        const { id } = req.params;
        const service = await model_1.default.findById(id);
        const link = `${process.env.API_URL}/api/accepting/${service.id}`;
        (0, nodemailer_1.sendEmail)(link, service, req.headers.authorization);
        return res.json(!!service);
    }
    async accepting(req, res) {
        const { id } = req.params;
        const service = await model_1.default.findById(id);
        try {
            await model_1.default.findByIdAndUpdate(id, {
                receiver: req.userId
            }, {
                new: true
            });
            return res.json(!!service);
        }
        catch (error) {
            return error;
        }
    }
}
exports.HomeController = HomeController;
;
