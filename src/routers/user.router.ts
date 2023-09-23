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
  "/add",
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
  "/list",
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

router.put(
  "/update/:userId",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  userMiddleware.isSuperuser,
  userController.updateById,
);

router.delete(
  "/delete/:userId",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  userMiddleware.isSuperuser,
  userController.deleteById,
);

export const userRouter = router;
