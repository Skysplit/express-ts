import { Strategy, IStrategyOptions } from "passport-local";
import { pick } from "lodash";
import { verifyPassword } from "../utils/verifyPassword";
import datasource from "../datasource";
import { User } from "../user.entity";

const options: IStrategyOptions = {
  usernameField: "email",
  passwordField: "password",
  session: false,
};

export const localStrategy = new Strategy(
  options,
  async (email, password, done) => {
    const user = await datasource.getRepository(User).findOne({
      where: { email },
      select: ["email", "password", "id"],
    });

    if (!user) {
      return done(new Error("User not found"));
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return done(new Error("Password does not match"));
    }

    done(null, pick(user, ["id", "email"]));
  }
);
