import { Router } from "express";

import { authController } from "../controllers";
import { commonMiddleware, userMiddleware } from "../middlewares";
import { ICredentials } from "../types";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  userMiddleware.isExist<ICredentials>("email"),
  authController.login,
);

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.create),
  userMiddleware.findAndThrow("email"),
  authController.register,
);

export const authRouter = router;
