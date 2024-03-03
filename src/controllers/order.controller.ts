import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { orderService } from "../services";
import { IOrder, IPagination } from "../types";

class OrderController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IPagination<IOrder[]>>> {
    try {
      const orders = await orderService.findAllWithPagination(req);

      return res.json(orders);
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

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IOrder>> {
    try {
      const orders = await orderService.findById(req.params.orderId);

      if (!orders) {
        throw new ApiError("Do not find order", 400);
      }

      return res.json(orders);
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

  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IOrder>> {
    try {
      const { orderId } = req.params;
      const updateOrder = await orderService.updateById(orderId, req.body);

      return res.status(200).json(updateOrder);
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

export const orderController = new OrderController();
