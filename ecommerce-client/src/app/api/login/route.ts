import UserModel from "@/db/models/UserModel";
import { cookies } from "next/headers";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const access_token = await UserModel.loginUser(body);
    // console.log(cookies().getAll());

    return Response.json(
      {
        message: "Login Succesful",
        access_token: access_token,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);

    if (error instanceof ZodError) {
      return Response.json(
        {
          message: error.issues[0].message,
        },
        { status: 400 }
      );
    }

    if (error.name === "InvalidLogin") {
      return Response.json(
        {
          message: "Invalid username/password",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
