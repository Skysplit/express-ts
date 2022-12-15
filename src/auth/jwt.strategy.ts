import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { Jwt, JwtPayload } from "jsonwebtoken";
import datasource from "../datasource";
import { User } from "../user.entity";

interface Token extends Jwt {
  payload: JwtPayload & Express.User;
}

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

export const jwtStrategy = new Strategy(
  options,
  async (payload: Token["payload"], done) => {
    const user = await datasource.getRepository(User).findOneBy({
      id: payload.id,
    });

    if (user) {
      done(null, user);
    } else {
      done(new Error("Auth failed"));
    }
  }
);
