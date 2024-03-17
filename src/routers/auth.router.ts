import { Router } from "express";

import { authController } from "../controllers";
import { EActionTokenTypes } from "../enums";
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
  authMiddleware.checkActionToken(EActionTokenTypes.Activate),
  authController.activate,
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

router.get("/me", authMiddleware.checkAccessToken, authController.myData);

export const authRouter = router;
