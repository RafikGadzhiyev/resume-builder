import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export const GET = async (req: Request, res: NextApiResponse) => {
  try {
    const parsedURL = new URL(req.url || "");
    const user_id = parsedURL.searchParams.get("user_id");
    const code = parsedURL.searchParams.get("code");
    if (user_id === null || code === null) {
      return new NextResponse("user id was not provided!", { status: 404 });
    }

    const check_code = cookies().get("verification_code")?.value;
    if (check_code !== code) {
      return new NextResponse(
        JSON.stringify({ message: "Code is not valid!" }),
        { status: 400 }
      );
    }

    // @ts-ignore
    cookies().set("verification_code", "", {
      maxAge: -1,
    });

    return new NextResponse(
      JSON.stringify({
        message: "Code is valid!\nRedirecting to your profile",
      }),
      {
        status: 200,
      }
    );
  } catch (e) {}
};
