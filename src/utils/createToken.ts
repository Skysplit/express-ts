import { sign } from "jsonwebtoken";
export const createToken = (payload: Express.User) =>
  sign(payload, process.env.SECRET, {
    subject: payload.id.toString(),
  });
