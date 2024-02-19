import { NextFunction, Request, Response } from "express";

import { groupService } from "../services";
import { IGroup } from "../types/group.type";

class GroupController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IGroup>> {
    try {
      const group = await groupService.create(req.body);

      return res.status(200).json(group._id);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IGroup>> {
    try {
      const group = await groupService.getById(req.params.groupId);

      return res.json(group);
    } catch (e) {
      next(e);
    }
  }

  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IGroup[]>> {
    try {
      const groups = await groupService.getAll();

      return res.status(200).json(groups);
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await groupService.remove(req.body);

      return res.status(200);
    } catch (e) {
      next(e);
    }
  }
}

export const groupController = new GroupController();
