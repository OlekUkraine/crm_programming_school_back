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
  authMiddleware.checkAccessToken,
  userMiddleware.isSuperuser,
  commonMiddleware.isBodyValid(UserValidator.create),
  userMiddleware.findAndThrow("email"),
  userController.create,
);

router.get(
  "/activate",
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
  authMiddleware.checkAccessToken,
  userMiddleware.isSuperuser,
  commonMiddleware.isIdValid("userId"),
  userController.findById,
);

router.put(
  "/update/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isSuperuser,
  commonMiddleware.isIdValid("userId"),
  userController.updateById,
);

router.delete(
  "/delete/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isSuperuser,
  commonMiddleware.isIdValid("userId"),
  userController.deleteById,
);

export const userRouter = router;
