import Joi from "joi";

import { ESortOrder } from "../enums";

export class GroupValidator {
  static page = Joi.number();
  static limitPage = Joi.number().max(100);
  static sortedBy = Joi.valid(...Object.values(ESortOrder));
  static searchObject = Joi.string();

  static groupName = Joi.string().min(3).max(30).trim();
  static orderId = Joi.string().trim();

  static create = Joi.object({
    groupName: this.groupName.required(),
  });

  static update = Joi.object({
    orderId: this.orderId.required(),
  });

  static getAll = Joi.object({
    page: this.page,
    limitPage: this.limitPage,
    sortedBy: this.sortedBy,
    searchObject: this.searchObject,
    groupName: this.groupName,
    orderId: this.orderId,
  });
}
