import { Router } from "express";

import { authController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
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
  "/activate",
  commonMiddleware.isBodyValid(UserValidator.register),
  authMiddleware.checkActionToken,
  authController.activate,
);

export const authRouter = router;
