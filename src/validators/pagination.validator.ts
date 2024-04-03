import Joi from "joi";

import { ESortOrder } from "../enums";

export class PaginationValidator {
  static page = Joi.number();
  static limitPage = Joi.number().max(100);
  static sortedBy = Joi.valid(...Object.values(ESortOrder));
  static searchObject = Joi.string();

  static getAll = Joi.object({
    page: this.page,
    limit: this.limitPage,
    sortedBy: this.sortedBy,
    searchObject: this.searchObject,
  });
}
