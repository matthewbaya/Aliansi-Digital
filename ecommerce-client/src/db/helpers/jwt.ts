import { JwtPayload, sign, verify } from "jsonwebtoken";

const secret = "SECRETKEY";

function signToken(payload: JwtPayload) {
  return sign(payload, secret);
}

function verifyToken(token: string) {
  return verify(token, secret);
}

export { signToken, verifyToken };
