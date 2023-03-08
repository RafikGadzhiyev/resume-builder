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
            message: "Server Error!\nReason: Cannot get main detail!"
        });
    }
    (0, jsonwebtoken_1.verify)(REFRESH_TOKEN, TOKEN_SECRET, (err, payload) => {
        if (err) {
            return res.status(406).send({ message: "Illegal access!\nReason: Invalid refresh token!" });
        }
        else {
            const refreshedToken = (0, jsonwebtoken_1.sign)(Object.assign(Object.assign({}, payload), { created_at: Date.now() }), TOKEN_SECRET, {
                expiresIn: '4h'
            });
            res.cookie('jwt', refreshedToken, {
                secure: true,
                httpOnly: true,
                maxAge: 4 * 60 * 60 * 1000
            });
            return res.status(200).send({
                message: "Token successfully refreshed!"
            });
        }
    });
}));
router.get('/retrieve', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.cookies.jwt) {
            return res.status(401).send({
                message: "Token does not exist! Please, log in again!"
            });
        }
        const TOKEN = req.cookies.jwt;
        const TOKEN_SECRET = process.env.GOOGLE_CLIENT_SECRET;
        if (!TOKEN_SECRET) {
            return res.status(500).send({
                message: "Server Error!\nReason: Cannot get main detail!"
            });
        }
        (0, jsonwebtoken_1.verify)(TOKEN, TOKEN_SECRET, (err, payload) => {
            if (err) {
                return res.status(406).send({
                    message: 'Illegal access!\nReason: Invalid token!'
                });
            }
            else {
                return res.status(200).send({
                    message: "Token succeessfully retrieved!",
                    payload
                });
            }
        });
    }
    catch (e) {
    }
}));
exports.default = router;
