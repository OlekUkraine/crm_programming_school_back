import Joi from "joi";

export class CommentValidator {
  static comment = Joi.string().min(10).max(500);
  static ordersId = Joi.string();

  static create = Joi.object({
    comment: this.comment.required(),
  });
}
