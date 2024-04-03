import Joi from "joi";

export class GroupValidator {
  static groupName = Joi.string().min(3).max(30).trim();
  static orderId = Joi.string().trim();

  static create = Joi.object({
    groupName: this.groupName.required(),
  });

  static update = Joi.object({
    orderId: this.orderId.required(),
  });
}
