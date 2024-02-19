import { NextFunction, Request, Response } from "express";

import { commentService } from "../services";
import { IComment } from "../types/comment.type";

class CommentController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<string>> {
    try {
      const comment = await commentService.create(req.body);

      return res.status(200).json(comment._id);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IComment>> {
    try {
      const comment = await commentService.getById(req.params.commentId);

      return res.status(200).json(comment);
    } catch (e) {
      next(e);
    }
  }

  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IComment>> {
    try {
      const comments = await commentService.getAll();

      return res.status(200).json(comments);
    } catch (e) {
      next(e);
    }
  }
}

export const commentController = new CommentController();
