import { Router, Request, Response } from 'express';
import { verify, sign, VerifyErrors } from 'jsonwebtoken'
import dotend from 'dotenv';
import { IAuthCredentials } from '../interfaces/aouth.interfaces';

dotend.config();
const router = Router();

router.get('/refresh', async (req: Request, res: Response) => {
    if (!req.cookies.jwt) {
        return res.status(401).send({
            message: "Unauthorized log in!"
        })
    }
    const REFRESH_TOKEN = req.cookies.jwt;
    const TOKEN_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    if (!TOKEN_SECRET) {
        return res.status(500).send({
            message: "Server Error!\nReason: Cannot get main detail!"
        })
    }
    verify(REFRESH_TOKEN, TOKEN_SECRET, (err: VerifyErrors | null, payload: any) => {
        if (err) {
            return res.status(406).send({ message: "Illegal access!\nReason: Invalid refresh token!" })
        } else {
            const refreshedToken = sign({
                ...payload,
                created_at: Date.now()
            }, TOKEN_SECRET, {
                expiresIn: '4h'
            })

            res.cookie('jwt', refreshedToken, {
                secure: true,
                httpOnly: true,
                maxAge: 4 * 60 * 60 * 1000
            });

            return res.status(200).send({
                message: "Token successfully refreshed!"
            })
        }
    })


})

router.get('/retrieve', async (req, res) => {
    try {
        if (!req.cookies.jwt) {
            return res.status(401).send({
                message: "Token does not exist! Please, log in again!"
            })
        }

        const TOKEN = req.cookies.jwt;
        const TOKEN_SECRET = process.env.GOOGLE_CLIENT_SECRET;
        if (!TOKEN_SECRET) {
            return res.status(500).send({
                message: "Server Error!\nReason: Cannot get main detail!"
            })
        }

        verify(TOKEN, TOKEN_SECRET, (err: VerifyErrors | null, payload: any) => {
            if (err) {
                return res.status(406).send({
                    message: 'Illegal access!\nReason: Invalid token!'
                })
            } else {

                return res.status(200).send({
                    message: "Token succeessfully retrieved!",
                    payload
                })
            }
        })
    } catch (e) {

    }
})

export default router;