import { NextRequest, NextResponse } from "next/server";
import { hashSync } from "bcrypt";
import axios from "axios";
import { client } from "../../../../../utils/sanity";
import { SanityDocument } from "@sanity/client";
import { IUserMutation } from "../../../../../interfaces/auth.interface";
import { ConstructDataFromSanityDocument } from "../../../../../utils/construct";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

const CMS_BASE_URL = process.env.SANITY_BASE_URL;
const CMS_DATASET = process.env.SANITY_DATASET;
const CMS_ACCESS_TOKEN = process.env.SANITY_TEST_TOKEN;
const TOKEN_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const TOTAL_SALT = 10;

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
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
    const parsedRequest = await req.json();
    const { email, fullname, password } = parsedRequest;

    const get_email_response = await axios.get(
      `${CMS_BASE_URL}query/${CMS_DATASET}?query=*[email == "${email}"]`
    );
    if (get_email_response.data.result.length) {
      return new NextResponse(
        JSON.stringify({ message: "This email already exists" }),
        {
          status: 409,
        }
      );
    }
    const splitted_name = fullname.split(/\s+/gi);
    const hashedPassword = hashSync(password, TOTAL_SALT);
    const data = {
      mutations: [
        {
          create: {
            _type: "user",
            first_name: splitted_name[0],
            last_name: splitted_name[1],
            email,
            age: 0,
            password: hashedPassword,
          },
        },
      ],
    };
    const create_user: SanityDocument<IUserMutation> = await client.create({
      _type: "user",
      first_name: splitted_name[0],
      last_name: splitted_name[1],
      email,
      age: 0,
      password: hashedPassword,
    });

    const result = ConstructDataFromSanityDocument(create_user);

    // for JWT remove exp and return again
    let exp = result.exp;
    delete result.exp;
    const accessToken = sign(result, TOKEN_SECRET, {
      expiresIn: "4h",
    });

    // @ts-ignore
    cookies().set("jwt", accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: 4 * 60 * 60 * 1000,
    });
    return new NextResponse(
      JSON.stringify({
        user: {
          ...result,
          exp,
        },
      }),
      { status: 200 }
    );
  } catch (e) {}
};
