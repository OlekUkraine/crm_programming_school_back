import { Request, Response } from "express";

import { ApiError } from "../errors";
import { commentService } from "../services";
import { IComment } from "../types";

class CommentController {
  public async create(req: Request, res: Response): Promise<Response<string>> {
    try {
      const comment = await commentService.create(req.body, req.params.orderId);

      return res.status(200).json(comment._id);
    } catch (e) {
      if (e instanceof ApiError) {
        res
          .status(e.status)
          .json({ error: { message: e.message, status: e.status } });
      } else {
        res
          .status(500)
          .json({ error: { message: "Internal Server Error", status: 500 } });
      }
    }
  }

  public async getById(
    req: Request,
    res: Response,
  ): Promise<Response<IComment>> {
    try {
      const comment = await commentService.getById(req.params.commentId);

      return res.status(200).json(comment);
    } catch (e) {
      if (e instanceof ApiError) {
        res
          .status(e.status)
          .json({ error: { message: e.message, status: e.status } });
      } else {
        res
          .status(500)
          .json({ error: { message: "Internal Server Error", status: 500 } });
      }
    }
  }

  public async getAll(
    req: Request,
    res: Response,
  ): Promise<Response<IComment>> {
    try {
      const comments = await commentService.findAllWithPagination(req);

      return res.status(200).json(comments);
    } catch (e) {
      if (e instanceof ApiError) {
        res
          .status(e.status)
          .json({ error: { message: e.message, status: e.status } });
      } else {
        res
          .status(500)
          .json({ error: { message: "Internal Server Error", status: 500 } });
      }
    }
  }
}

export const commentController = new CommentController();
