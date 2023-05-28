import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { verify, VerifyErrors } from "jsonwebtoken";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const GET = async (req: Request, res: NextApiResponse) => {
  try {
    const TOKEN = cookies().get("jwt")?.value;
    if (!TOKEN) {
      return new NextResponse(
        JSON.stringify({
          message: "Token does not exist! Please, log in again!",
        }),
        {
          status: 401,
        }
      );
    }
    const TOKEN_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;
    if (!TOKEN_SECRET) {
      return new NextResponse(
        JSON.stringify({
          message: "Server Error!\nReason: Cannot get main detail!",
        }),
        {
          status: 500,
        }
      );
    }
    const result = verify(TOKEN, TOKEN_SECRET);

    if (typeof result === "string") {
      return new NextResponse(
        JSON.stringify({
          message: "Token was not found!",
        }),
        {
          status: 404,
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Successfully",
        data: result,
      }),
      { status: 200 }
    );
  } catch (e: any) {}
};
