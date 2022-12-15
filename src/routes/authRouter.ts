import { Router } from "express";
import datasource from "../datasource";
import { User } from "../user.entity";
import { hashPassword } from "../utils/hashPassword";
import { passport } from "../auth";
import { createToken } from "../utils/createToken";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const user = await datasource.getRepository(User).save({
    email: req.body.email,
    password: await hashPassword(req.body.password),
  });

  res.json({
    id: user.id,
    email: user.email,
  });
});

authRouter.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({
    token: createToken(req.user!),
  });
});
