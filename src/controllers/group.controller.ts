import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
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
    next: NextFunction,
  ): Promise<Response<IGroup>> {
    try {
      const group = await groupService.getById(req.params.groupId);

      return res.json(group);
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
    next: NextFunction,
  ): Promise<Response<IGroup[]>> {
    try {
      const groups = await groupService.getAll();

      return res.status(200).json(groups);
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

export const groupController = new GroupController();
