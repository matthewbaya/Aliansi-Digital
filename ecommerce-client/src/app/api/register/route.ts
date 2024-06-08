import UserModel from "@/db/models/UserModel";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await UserModel.registerUser(body);

    return Response.json(
      {
        message: "User Registered",
        registered_user: { username: body.username, email: body.email },
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === "UserExists") {
      return Response.json(
        {
          message: "User already exists",
        },
        { status: 400 }
      );
    }

    if (error instanceof ZodError) {
      return Response.json(
        {
          message: error.issues[0].message,
        },
        { status: 400 }
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
