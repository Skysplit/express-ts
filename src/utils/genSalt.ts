import bcrypt from "bcrypt";
import { promisify } from "util";

export const genSalt = promisify(bcrypt.genSalt);
