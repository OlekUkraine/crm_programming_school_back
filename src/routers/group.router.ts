import { Router } from "express";

import { groupController } from "../controllers/group.controller";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
// import { groupMiddleware } from "../middlewares/group.middleware";
import { GroupValidator } from "../validators/group.validator";

const router = Router();

router.post(
  "/add",
  commonMiddleware.isBodyValid(GroupValidator.create),
  authMiddleware.checkAccessToken,
  userMiddleware.isActive,
  // groupMiddleware.findOrCreate("groupName"),
  groupController.create,
);

router.get(
  "/list",
  authMiddleware.checkAccessToken,
  userMiddleware.isActive,
  groupController.getAll,
);

router.get(
  "/:groupId",
  commonMiddleware.isIdValid("groupId"),
  authMiddleware.checkAccessToken,
  userMiddleware.isActive,
  groupController.getById,
);

export const groupRouter = router;
