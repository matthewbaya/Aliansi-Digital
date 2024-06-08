import { JwtPayload, sign, verify } from "jsonwebtoken";
import * as jose from "jose";

const secret = process.env.SECRET as string;

function signToken(payload: JwtPayload) {
  return sign(payload, secret);
}

function verifyToken(token: string) {
  return verify(token, secret);
}

const readPayloadJose = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(secret);
  const payloadJose = await jose.jwtVerify<T>(token, secretKey);
  return payloadJose.payload;
};

export { signToken, verifyToken, readPayloadJose };
