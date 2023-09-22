import { NextFunction, Request, Response } from "express";

import { userService } from "../services";
import { IPagination, IQuery, IUser } from "../types";

class UserController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await userService.create(req.body);

      return res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IPagination<IUser>>> {
    try {
      const users = await userService.findAllWithPagination(
        req.query as unknown as IQuery,
      );

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const users = await userService.findById(req.params.userId);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;
      const updateUser = await userService.updateById(userId, req.body);

      return res.status(200).json(updateUser);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;
      await userService.deleteById(userId);

      return res.status(204);
    } catch (e) {
      next(e);
    }
  }

  public async getActivationLink(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<string>> {
    try {
      const token = await userService.getActivationLink(req.body);
      return res.status(200).json(token);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
