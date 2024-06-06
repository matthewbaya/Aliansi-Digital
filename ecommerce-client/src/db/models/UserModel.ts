import { getCollection } from "../config";
import { hashPassword } from "../helpers/bcrypt";
import { z } from "zod";

type NewUser = {
  username: string;
  email: string;
  password: string;
};

const NewUserSchema = z.object({
  username: z.string({ required_error: "Username cannot be empty" }),
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

  static async registerUser(newUser: NewUser) {
    const parseResult = NewUserSchema.safeParse(newUser);
    if (!parseResult.success) {
      console.log(parseResult.error);
      throw parseResult.error;
    }
    const existingUser = await this.collection().findOne({
      $or: [{ email: newUser.email }, { username: newUser.username }],
    });
    if (existingUser) {
      throw { name: "UserExists" };
    }

    const user = await this.collection().insertOne({
      ...newUser,
      password: hashPassword(newUser.password),
    });
    return user;
  }

  static async loginUser() {}
}

export default UserModel;
