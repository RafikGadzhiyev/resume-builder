import { NextResponse } from "next/server";
import { NextApiResponse } from "next";
import axios from "axios";
import { compareSync } from "bcrypt";
import { ILogin } from "../../../../../interfaces/auth.interface";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
export async function POST(req: Request, res: NextApiResponse) {
  try {
    const parsedRequest = await req.json();
    const CMS_BASE_URL = process.env.SANITY_BASE_URL;
    const CMS_DATASET = process.env.SANITY_DATASET;
    const TOKEN_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    if (!TOKEN_SECRET) {
      return new Response(
        JSON.stringify({
          message: "Server Error!\nReason: Cannot get main detail",
        }),
        {
          status: 500,
        }
      );
    }

    const { email, password } = parsedRequest;
    const check_user = await axios.get(
      `${CMS_BASE_URL}query/${CMS_DATASET}?query=*[email match "${email}"]`
    );
    if (check_user.data.result.length === 0) {
      return new Response(
        JSON.stringify({ message: "This email not found!" }),
        {
          status: 404,
        }
      );
    }
    const user = check_user.data.result[check_user.data.result.length - 1];
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ message: "Incorrect password!" }), {
        status: 401,
      });
    }
    const data: ILogin = {
      id: user._id,
      age: user.age,
      given_name: user.given_name,
      family_name: user.family_name,
      full_name: user.first_name + " " + user.last_name,
      email,
      created_at: Date.now(),
    };
    const accessToken = sign(data, TOKEN_SECRET, {
      expiresIn: "4h",
    });
    const response = NextResponse.json(
      {
        ...data,
        exp: data.created_at + 4 * 60 * 60 * 1000,
      },
      { status: 200 }
    );
    // response.cookies.set("jwt", accessToken, {
    //   secure: true,
    //   httpOnly: true,
    //   maxAge: 4 * 60 * 60 * 1000,
    // });

    // @ts-ignore
    cookies().set("jwt", accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: 4 * 60 * 60 * 1000,
    });

    return response;
  } catch (e) {}
}
