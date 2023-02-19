import { Router, Request, Response } from "express";
import { decode, JwtPayload, sign } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IGoogleOauthCredentials } from "../interfaces/aouth.interfaces";
import { hashSync, compareSync } from 'bcrypt';
import axios from 'axios';

dotenv.config();
const router = Router();
const CMS_BASE_URL = process.env.SANITY_BASE_URL;
const CMS_DATASET = process.env.SANITY_DATASET;
const CMS_ACCESS_TOKEN = process.env.SANITY_TEST_TOKEN;
const TOTAL_SALT = 10;


// TODO: ADD JWT TOKENS FOR EACH TYPE OF LOGINS !!!!!!!

router.get('/google', (req: Request, res: Response) => {
    const AUTH_HEADER = req.headers['authorization'];
    if (!AUTH_HEADER) {
        return res.status(401).send({
            message: "Invalid token! Please, log in!"
        });

    }
    const AUTH_TOKEN = (AUTH_HEADER as string).split(' ')[1];
    const TOKEN_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
    if (!TOKEN_SECRET) {
        return res.status(500).send({
            message: "Unexpected behavior!"
        })
    }
    const payload = decode(AUTH_TOKEN) as JwtPayload;
    if (!payload) {
        return res.status(401).send({
            message: "Try again!"
        })
    }
    const data: IGoogleOauthCredentials = {
        email: payload.email || '',
        email_verified: payload.email_verified,
        name: payload.name,
        given_name: payload.given_name,
        family_name: payload.family_name,
    }

    const jwt_token = sign(data, TOKEN_SECRET, {
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

})

router.post('/login', async (req, res) => {
    // console.log(req.body);
    const {
        email,
        password
    } = req.body;

    // console.log(
    //     `${CMS_BASE_URL}query/${CMS_DATASET}?query=*[email == "${email}"]`
    // )
    const check_user = await axios.get(
        `${CMS_BASE_URL}query/${CMS_DATASET}?query=*[email == "${email}"]`
    )
    if (check_user.data.result.length === 0) {
        return res.status(404).send({
            message: "This email not found!"
        })
    }

    const user = check_user.data.result[0];
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({
            message: "Incorrect password!"
        })
    }

    res.status(200).send({
        message: "Success Login!",
        data: {
            id: user._id,
            age: user.age,
            full_name: user.first_name + ' ' + user.last_name,
        }
    })
})

router.post('/sign_up', async (req, res) => {
    try {
        const {
            email, fullname, password
        } = req.body;
        const get_email_response = await axios.get(
            `${CMS_BASE_URL}query/${CMS_DATASET}?query=*[email == "${email}"]`
        )
        if (get_email_response.data.result.length) {
            return res.status(409).send({
                message: "This email already exists"
            })
        }

        const splitted_name = fullname.split(/\s+/gi);
        const hashedPassword = hashSync(password, TOTAL_SALT);

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
        }

        const create_user = await axios.post(
            `${CMS_BASE_URL}mutate/${CMS_DATASET}?returnIds=true`,
            JSON.stringify(data),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${CMS_ACCESS_TOKEN}`
                }
            }
        )
        console.log(create_user.data);
        res.status(create_user.status).send({
            id: create_user.data.results[0].id,
            email,
            fullname,
            age: 0
        })
    } catch (e: any) {
        res.status(400).send({
            message: e.message
        })
    }
})

// TODO: add login router via get

export default router

/*
    To this URL: https://<YOUR_DOMAIN>/api/<YOUR_CT>
With the header: Authorization: bearer <YOUR_API_TOKEN>
*/