import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { GenerateVerificationCode } from "../../../../../utils/generators";
import axios, { AxiosResponse } from "axios";
import { createTransport } from "nodemailer";
import { cookies } from "next/headers";

const CMS_BASE_URL = process.env.SANITY_BASE_URL;
const CMS_DATASET = process.env.SANITY_DATASET;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
const GMAIL = process.env.GMAIL;

const transport_config = {
  service: "Gmail",
  auth: {
    user: GMAIL,
    pass: GMAIL_PASSWORD,
  },
};
let transporter = createTransport(transport_config);

export const dynamic = "force-dynamic";

export const GET = async (req: Request, res: NextApiResponse) => {
  try {
    const parsedURL = new URL(req.url || "");
    const user_id = parsedURL.searchParams.get("user_id");
    if (user_id === null) {
      return new NextResponse(
        JSON.stringify({ message: "user id was not provided!" }),
        { status: 404 }
      );
    }
    const user_email: AxiosResponse = await axios.get(
      `${CMS_BASE_URL}query/${CMS_DATASET}?query=*[_id == '${user_id}']`
    );
    if (user_email.status >= 400) {
      return new NextResponse(
        JSON.stringify({ message: user_email.statusText }),
        { status: user_email.status }
      );
    }
    let code = GenerateVerificationCode(false, 6);
    // @ts-ignore
    cookies().set("verification_code", code);
    const sentResult = await transporter.sendMail({
      from: `"HiResume" ${GMAIL}`,
      to: user_email.data.result[0].email,
      subject: "Verification code",
      text: "",
      html: `
                <div
                    style = "text-align:center;"
                >
                <h1>Hello from HiResume!</h1>
                <h2>Here is your verification code</h2>
                <div style='padding: 15px 30px; border-radius: 5px; background-color: #1D1E26; color: #fff; width:min-content; margin: auto'>
                    <b style='font-size: 40px'>${code}</b>
                </div>
                `,
    });

    if (sentResult.rejected.length !== 0) {
      return new NextResponse(
        JSON.stringify({
          message: "Our mail protocol rejected! Please, try later!",
        }),
        { status: 500 }
      );
    }
    return new NextResponse(JSON.stringify({ message: "Successfully sent!" }), {
      status: 200,
    });
  } catch (e) {
    console.log(e);
  }
};
