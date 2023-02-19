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
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = require("bcrypt");
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
const CMS_BASE_URL = process.env.SANITY_BASE_URL;
const CMS_DATASET = process.env.SANITY_DATASET;
const CMS_ACCESS_TOKEN = process.env.SANITY_TEST_TOKEN;
const TOTAL_SALT = 10;
// TODO: ADD JWT TOKENS FOR EACH TYPE OF LOGINS !!!!!!!
router.get('/google', (req, res) => {
    const AUTH_HEADER = req.headers['authorization'];
    if (!AUTH_HEADER) {
        return res.status(401).send({
            message: "Invalid token! Please, log in!"
        });
    }
    const AUTH_TOKEN = AUTH_HEADER.split(' ')[1];
    const TOKEN_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    if (!TOKEN_SECRET) {
        return res.status(500).send({
            message: "Unexpected behavior!"
        });
    }
    const payload = (0, jsonwebtoken_1.decode)(AUTH_TOKEN);
    if (!payload) {
        return res.status(401).send({
            message: "Try again!"
        });
    }
    const data = {
        email: payload.email || '',
        email_verified: payload.email_verified,
        name: payload.name,
        given_name: payload.given_name,
        family_name: payload.family_name,
    };
    const jwt_token = (0, jsonwebtoken_1.sign)(data, TOKEN_SECRET, {
        expiresIn: '4h'
    });
    res.cookie("jwt", jwt_token, {
        httpOnly: true,
        secure: true,
        maxAge: 5 * 60 * 60 * 1000
    });
    return res.status(201).send({
        message: "Token successfuly created!",
        credentials: payload
    });
});
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const { email, password } = req.body;
    // console.log(
    //     `${CMS_BASE_URL}query/${CMS_DATASET}?query=*[email == "${email}"]`
    // )
    const check_user = yield axios_1.default.get(`${CMS_BASE_URL}query/${CMS_DATASET}?query=*[email == "${email}"]`);
    if (check_user.data.result.length === 0) {
        return res.status(404).send({
            message: "This email not found!"
        });
    }
    const user = check_user.data.result[0];
    const isPasswordValid = (0, bcrypt_1.compareSync)(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({
            message: "Incorrect password!"
        });
    }
    res.status(200).send({
        message: "Success Login!",
        data: {
            id: user._id,
            age: user.age,
            full_name: user.first_name + ' ' + user.last_name,
        }
    });
}));
router.post('/sign_up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, fullname, password } = req.body;
        const get_email_response = yield axios_1.default.get(`${CMS_BASE_URL}query/${CMS_DATASET}?query=*[email == "${email}"]`);
        if (get_email_response.data.result.length) {
            return res.status(409).send({
                message: "This email already exists"
            });
        }
        const splitted_name = fullname.split(/\s+/gi);
        const hashedPassword = (0, bcrypt_1.hashSync)(password, TOTAL_SALT);
        const data = {
            mutations: [
                {
                    create: {
                        "_type": "user",
                        first_name: splitted_name[0],
                        last_name: splitted_name[1],
                        email,
                        age: 0,
                        password: hashedPassword
                    }
                }
            ]
        };
        const create_user = yield axios_1.default.post(`${CMS_BASE_URL}mutate/${CMS_DATASET}?returnIds=true`, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${CMS_ACCESS_TOKEN}`
            }
        });
        console.log(create_user.data);
        res.status(create_user.status).send({
            id: create_user.data.results[0].id,
            email,
            fullname,
            age: 0
        });
    }
    catch (e) {
        res.status(400).send({
            message: e.message
        });
    }
}));
// TODO: add login router via get
exports.default = router;
/*
    To this URL: https://<YOUR_DOMAIN>/api/<YOUR_CT>
With the header: Authorization: bearer <YOUR_API_TOKEN>
*/ 
