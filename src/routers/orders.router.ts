import { Router } from "express";

import { orderController } from "../controllers";
import { authMiddleware } from "../middlewares";

const router = Router();

router.get(
  "/list",
  // commonMiddleware.isBodyValid(UserValidator.login),
  // userMiddleware.isExist<ICredentials>("email"),
  authMiddleware.checkAccessToken,
  orderController.getAll,
);

export const orderRouter = router;
