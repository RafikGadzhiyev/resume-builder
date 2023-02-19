import { Router } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import { createTransport } from 'nodemailer';
import { GenerateVerificationCode } from '../utils/generators.utils';
dotenv.config();

const CMS_BASE_URL = process.env.SANITY_BASE_URL;
const CMS_DATASET = process.env.SANITY_DATASET;
const CMS_ACCESS_TOKEN = process.env.SANITY_TEST_TOKEN;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD
const GMAIL = process.env.GMAIL

let verificationCode = GenerateVerificationCode();

const router = Router();
const transport_config = {
    service: "Gmail",
    auth: {
        user: GMAIL,
        pass: GMAIL_PASSWORD
    }
}
let transporter = createTransport(transport_config);


router.get('/send_code/:id', async (req, res) => {
    try {
        const get_user_email = await axios.get(
            `${CMS_BASE_URL}query/${CMS_DATASET}?query=*[_id == '${req.params.id}']`
        )
        if (get_user_email.status >= 400) {
            return res.status(get_user_email.status).send({
                message: req.statusMessage
            })
        }

        const send_data = transporter.sendMail(
            {
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
            },
            (err) => {
                if (err) {
                    return res.status(500).send({
                        message: err.message
                    })
                }
            }
        )

        return res.status(200).send({
            message: send_data
        })

    } catch (e) {
        return res.status(500).send({
            message: "Server Error!"
        })
    }
});

export default router;