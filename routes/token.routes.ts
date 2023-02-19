import { Router, Request, Response } from 'express';
import { verify, sign, VerifyErrors } from 'jsonwebtoken'
import dotend from 'dotenv';
import { IGoogleOauthCredentials } from '../interfaces/aouth.interfaces';

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
            message: "Sever Error!\nReason: Cannot see main detail!"
        })
    }
    verify(REFRESH_TOKEN, TOKEN_SECRET, (err: VerifyErrors | null, payload: any) => {
        if (err) {
            // just right now
            // TODO: CREATE HANDLER FOR EACH ERROR STATUS!
            return res.status(406).send({ message: "Illegal access!\nReason: Invalid refresh token!" })
        } else {
            const data: IGoogleOauthCredentials = {
                email: payload.email || '',
                email_verified: payload.email_verified,
                name: payload.name,
                given_name: payload.given_name,
                family_name: payload.family_name,
            }

            const refreshedToken = sign(data, TOKEN_SECRET, {
                expiresIn: '4h'
            })

            res.cookie('jwt', refreshedToken, {
                secure: true,
                httpOnly: true,
                maxAge: 5 * 60 * 60 * 1000
            });

            return res.status(200).send({
                message: "Token successfuly refreshed!"
            })
        }
    })


})

export default router;