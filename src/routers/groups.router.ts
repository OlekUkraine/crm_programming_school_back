import { Router } from "express";

import { groupController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { GroupValidator } from "../validators";

const router = Router();

router.post(
  "/",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(GroupValidator.create),
  userMiddleware.isActive,
  groupController.create,
);

router.get(
  "/",
  authMiddleware.checkAccessToken,
  userMiddleware.isActive,
  groupController.getAll,
);

router.get(
  "/:groupId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("groupId"),
  userMiddleware.isActive,
  groupController.getById,
);

router.patch(
  "/:groupId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("groupId"),
  commonMiddleware.isBodyValid(GroupValidator.update),
  userMiddleware.isActive,
  groupController.addUser,
);

export const groupsRouter = router;
