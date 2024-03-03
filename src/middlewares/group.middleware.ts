import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { Group } from "../models/Group.model";
import { IGroup } from "../types/group.type";

class GroupMiddleware {
  public findOrCreate(field: keyof IGroup) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const group = await Group.findOne({ [field]: req.body[field] });

        if (!group) {
          throw new ApiError("User with this email already exist", 409);
        }

        next();
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
    };
  }
}

export const groupMiddleware = new GroupMiddleware();
