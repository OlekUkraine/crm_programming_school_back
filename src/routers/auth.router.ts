import { Router } from "express";

import { authController } from "../controllers";
import { EActionTokenTypes } from "../enums";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { ICredentials, IUser } from "../types";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  userMiddleware.isExist<ICredentials>("email"),
  userMiddleware.isActive,
  authController.login,
);

router.post(
  "/activate",
  commonMiddleware.isBodyValid(UserValidator.register),
  authMiddleware.checkActionToken(EActionTokenTypes.Activate),
  authController.activate,
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

router.post(
  "/forgot-token",
  commonMiddleware.isBodyValid(UserValidator.forgotPassword),
  userMiddleware.isExist<IUser>("email"),
  authController.forgotPassword,
);

router.put(
  "/forgot",
  commonMiddleware.isBodyValid(UserValidator.setForgotPassword),
  authMiddleware.checkActionToken(EActionTokenTypes.Forgot),
  authController.setForgotPassword,
);

router.get("/me", authMiddleware.checkAccessToken, authController.myData);

export const authRouter = router;
