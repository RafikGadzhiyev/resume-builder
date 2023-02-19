"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const nodemailer_1 = require("nodemailer");
const generators_utils_1 = require("../utils/generators.utils");
dotenv_1.default.config();
const CMS_BASE_URL = process.env.SANITY_BASE_URL;
const CMS_DATASET = process.env.SANITY_DATASET;
const CMS_ACCESS_TOKEN = process.env.SANITY_TEST_TOKEN;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
const GMAIL = process.env.GMAIL;
let verificationCode = (0, generators_utils_1.GenerateVerificationCode)();
const router = (0, express_1.Router)();
const transport_config = {
    service: "Gmail",
    auth: {
        user: GMAIL,
        pass: GMAIL_PASSWORD
    }
};
let transporter = (0, nodemailer_1.createTransport)(transport_config);
router.get('/send_code/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get_user_email = yield axios_1.default.get(`${CMS_BASE_URL}query/${CMS_DATASET}?query=*[_id == '${req.params.id}']`);
        if (get_user_email.status >= 400) {
            return res.status(get_user_email.status).send({
                message: req.statusMessage
            });
        }
        const send_data = transporter.sendMail({
            from: `"HiResume" ${GMAIL}`,
            to: get_user_email.data.result[0].email,
            subject: "Verification code",
            text: "",
            html: `
                <div
                    style = "text-align:center;"
                >
                <h1>Hello from HiResume!</h1>
                <h2>Here is your verification code</h2>
                <div style='padding: 15px 30px; border-radius: 5px; background-color: #1D1E26; color: #fff; width:min-content; margin: auto'>
                    <b style='font-size: 40px'>${verificationCode}</b>
                </div>
                `
        }, (err) => {
            if (err) {
                return res.status(500).send({
                    message: err.message
                });
            }
        });
        return res.status(200).send({
            message: send_data
        });
    }
    catch (e) {
        return res.status(500).send({
            message: "Server Error!"
        });
    }
}));
exports.default = router;
