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
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.get('/refresh', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies.jwt) {
        return res.status(401).send({
            message: "Unauthorized log in!"
        });
    }
    const REFRESH_TOKEN = req.cookies.jwt;
    const TOKEN_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    if (!TOKEN_SECRET) {
        return res.status(500).send({
            message: "Sever Error!\nReason: Cannot see main detail!"
        });
    }
    (0, jsonwebtoken_1.verify)(REFRESH_TOKEN, TOKEN_SECRET, (err, payload) => {
        if (err) {
            // just right now
            // TODO: CREATE HANDLER FOR EACH ERROR STATUS!
            return res.status(406).send({ message: "Illegal access!\nReason: Invalid refresh token!" });
        }
        else {
            const data = {
                email: payload.email || '',
                email_verified: payload.email_verified,
                name: payload.name,
                given_name: payload.given_name,
                family_name: payload.family_name,
            };
            const refreshedToken = (0, jsonwebtoken_1.sign)(data, TOKEN_SECRET, {
                expiresIn: '4h'
            });
            res.cookie('jwt', refreshedToken, {
                secure: true,
                httpOnly: true,
                maxAge: 5 * 60 * 60 * 1000
            });
            return res.status(200).send({
                message: "Token successfuly refreshed!"
            });
        }
    });
}));
exports.default = router;
