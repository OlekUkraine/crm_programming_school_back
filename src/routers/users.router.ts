import { Router } from "express";

import { userController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/",
  commonMiddleware.isBodyValid(UserValidator.create),
  authMiddleware.checkAccessToken,
  userMiddleware.isSuperuser,
  userMiddleware.findAndThrow("email"),
  userController.create,
);

router.get(
  "/:userId/activation-token",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  userMiddleware.isSuperuser,
  userController.getActivationLink,
);

router.get(
  "/",
  authMiddleware.checkAccessToken,
  userMiddleware.isSuperuser,
  userController.getAll,
);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  userMiddleware.isSuperuser,
  userController.findById,
);

router.patch(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
  authMiddleware.checkAccessToken,
  userMiddleware.isSuperuser,
  userController.updateById,
);

router.patch(
  "/:userId/ban",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  userMiddleware.isSuperuser,
  userController.ban,
);

router.patch(
  "/:userId/unban",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  userMiddleware.isSuperuser,
  userController.unban,
);

export const usersRouter = router;
