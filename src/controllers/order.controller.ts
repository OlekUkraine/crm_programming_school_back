import { NextFunction, Request, Response } from "express";

import { orderService } from "../services";
import { IOrder, IQuery } from "../types";

class OrderController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IOrder[]>> {
    try {
      const orders = await orderService.findAllWithPagination(
        req.query as unknown as IQuery,
      );

      return res.json(orders);
    } catch (e) {
      next(e);
    }
  }
}

export const orderController = new OrderController();
