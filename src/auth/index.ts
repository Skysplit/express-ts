import passport from "passport";
import { localStrategy } from "./local.strategy";
import { jwtStrategy } from "./jwt.strategy";

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: Express.User, done) => done(null, user));

passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

export { passport };
