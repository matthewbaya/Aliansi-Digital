import { getCollection } from "../config";
import { comparePassword, hashPassword } from "../helpers/bcrypt";
import { z } from "zod";
import { signToken } from "../helpers/jwt";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";

type NewUser = {
  username: string;
  email: string;
  password: string;
};

type User = {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
};

type LoginUser = {
  _id: ObjectId;
  email: string;
  password: string;
};

const LoginUserSchema = z.object({
  email: z.string({ required_error: "Please insert your email" }),
  password: z.string({ required_error: "Please insert your password" }),
});

const NewUserSchema = z.object({
  username: z
    .string({ required_error: "Username cannot be empty" })
    .email({ message: "Invalid email address" }),
  email: z
    .string({ required_error: "Email cannot be empty" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password cannot be empty" })
    .min(5, { message: "Must be 5 or more characters long" }),
});
class UserModel {
  static collection() {
    return getCollection("Users");
  }

  static async loginUser(loginUser: LoginUser) {
    const parseResult = LoginUserSchema.safeParse(loginUser);
    if (!parseResult.success) {
      console.log(parseResult.error);
      throw parseResult.error;
    }
    const user = await this.collection().findOne({
      email: loginUser.email,
    });

    if (!user) {
      throw { name: "InvalidLogin" };
    }
    const passwordVal = comparePassword(loginUser.password, user.password);
    if (!passwordVal) {
      throw { name: "InvalidLogin" };
    }

    const access_token = signToken({
      id: user._id,
      email: user.email,
      username: user.username,
    });
    cookies().set("Authorization", "Bearer " + access_token);
    return access_token;
  }

  static async registerUser(newUser: NewUser) {
    const existingUser = await this.collection().findOne({
      $or: [{ email: newUser.email }, { username: newUser.username }],
    });

    if (existingUser) {
      throw { name: "UserExists" };
    }
    const parseResult = NewUserSchema.safeParse(newUser);
    if (!parseResult.success) {
      // console.log(parseResult.error);
      throw parseResult.error;
    }

    const user = await this.collection().insertOne({
      ...newUser,
      password: hashPassword(newUser.password),
    });
    return user;
  }
}

export default UserModel;
