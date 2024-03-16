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
  commonMiddleware.isBodyValid(GroupValidator.create),
  authMiddleware.checkAccessToken,
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
  commonMiddleware.isIdValid("groupId"),
  authMiddleware.checkAccessToken,
  userMiddleware.isActive,
  groupController.getById,
);
//
// router.delete(
//   "/:groupId",
//   commonMiddleware.isIdValid("groupId"),
//   authMiddleware.checkAccessToken,
//   userMiddleware.isSuperuser,
//   groupController.delete,
// );

export const groupsRouter = router;
