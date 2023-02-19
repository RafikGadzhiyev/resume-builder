import express, { Express, json, urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// routes
import OauthRouter from './routes/oauth.routes';
import TokenRouter from './routes/token.routes'

dotenv.config();

const app: Express = express();
const PORT: string = process.env.PORT || '3001';

app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3030"],
    credentials: true
}));
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: false }))

//routes
app.use('/auth', OauthRouter);
app.use('/token', TokenRouter)

app.listen(PORT, () => {
    console.log("Server is listening on " + PORT + ' port');
})
