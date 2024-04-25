import Joi from "joi";

import { ESortOrder } from "../enums";

export class CommentValidator {
  static page = Joi.number();
  static limitPage = Joi.number().max(100);
  static sortedBy = Joi.valid(...Object.values(ESortOrder));
  static searchObject = Joi.string();

  static comment = Joi.string().min(10).max(500);
  static orderId = Joi.string();

  static create = Joi.object({
    comment: this.comment.required(),
  });

  static getAll = Joi.object({
    page: this.page,
    limitPage: this.limitPage,
    sortedBy: this.sortedBy,
    searchObject: this.searchObject,
    orderId: this.orderId,
  });
}
