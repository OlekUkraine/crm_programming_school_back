import Joi from "joi";

export class GroupValidator {
  static groupName = Joi.string().min(3).max(30).trim();
  static ordersId = Joi.array().items(Joi.string());

  static create = Joi.object({
    groupName: this.groupName.required(),
    orderId: Joi.string().required(),
  });
}
