import bcrypt from "bcrypt";
import { genSalt } from "./genSalt";

export const hashPassword = (password: string) => {
  return new Promise<string>(async (resolve, reject) => {
    bcrypt.hash(password, await genSalt(), (err, encrypted) => {
      if (err) {
        return reject(err);
      }

      resolve(encrypted);
    });
  });
};
