// import { hashSync, compareSync } from "bcryptjs";
import { hashSync, compareSync } from "bcryptjs";

function hashPassword(password: string): string {
  return hashSync(password);
}

function comparePassword(password: string, passwordDb: string): boolean {
  return compareSync(password, passwordDb);
}

export { hashPassword, comparePassword };
