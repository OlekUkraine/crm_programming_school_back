import { Router } from "express";

import { commentController } from "../controllers/comment.controller";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { CommentValidator } from "../validators/comment.validator";

const router = Router();

router.post(
  "/",
  commonMiddleware.isBodyValid(CommentValidator.create),
  authMiddleware.checkAccessToken,
  userMiddleware.isActive,
  commentController.create,
);

router.get(
  "/",
  authMiddleware.checkAccessToken,
  userMiddleware.isActive,
  commentController.getAll,
);

router.get(
  "/:commentId",
  commonMiddleware.isIdValid("commentId"),
  authMiddleware.checkAccessToken,
  userMiddleware.isActive,
  commentController.getById,
);

export const commentsRouter = router;
