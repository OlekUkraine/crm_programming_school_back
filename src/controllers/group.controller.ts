import { NextFunction, Request, Response } from "express";

// import { Order } from "../models";
import { groupService } from "../services/group.service";
import { IGroup } from "../types/group.type";
// import { orderController } from "./order.controller";

class GroupController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const group = await groupService.create(req.body);
      if (group) {
        // await orderController.updateById(req.body.groupId);
      }
      return res.status(200).json(group);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await groupService.getById(req.body);
      return res.status(200);
    } catch (e) {
      next(e);
    }
  }

  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IGroup>> {
    try {
      const groups = await groupService.getAll();

      return res.status(200).json(groups);
    } catch (e) {
      next(e);
    }
  }
}

export const groupController = new GroupController();
