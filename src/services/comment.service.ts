import { ApiError } from "../errors";
import { Comment } from "../models";
import { IComment } from "../types";

class CommentService {
  public async create(
    { comment }: IComment,
    orderId: string,
  ): Promise<IComment> {
    try {
      if (!comment || !orderId) {
        throw new ApiError("Comments and orderId must be filled", 400);
      }

      return await Comment.create({
        comment,
        orderId,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getAll(): Promise<IComment[]> {
    try {
      return await Comment.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(commentId: string): Promise<IComment> {
    try {
      return await Comment.findById(commentId);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const commentService = new CommentService();
