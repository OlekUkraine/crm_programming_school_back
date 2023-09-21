import { NextFunction, Request, Response } from "express";

import { orderService } from "../services";
import { IOrder, IPagination, IQuery } from "../types";

class OrderController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IPagination<IOrder>>> {
    try {
      const orders = await orderService.findAllWithPagination(
        req.query as unknown as IQuery,
      );

      return res.json(orders);
    } catch (e) {
      next(e);
    }
  }

  public async addOrder(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await orderService.addOrder(req.body);

      return res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IOrder>> {
    try {
      const orders = await orderService.findById(req.params.orderId);
      return res.json(orders);
    } catch (e) {
      next(e);
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
      next(e);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IOrder>> {
    try {
      const { orderId } = req.params;
      const deletedOrder = await orderService.deleteById(orderId);

      return res.status(204).json(deletedOrder);
    } catch (e) {
      next(e);
    }
  }
}

export const orderController = new OrderController();
