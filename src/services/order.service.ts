import { Request } from "express";

import { EObjectType } from "../enums";
import { ApiError } from "../errors";
import { Order } from "../models";
import { IOrder, IPagination, IQuery } from "../types";
import { paginationService } from "./pagination.service";

class OrderService {
  public async getAll(): Promise<IOrder[]> {
    return await Order.find();
  }

  public async findAllWithPagination(
    req: Request,
  ): Promise<IPagination<IOrder>> {
    const { query } = req;

    return await paginationService.addPaginationForList<IOrder>(
      query as IQuery,
      EObjectType.Order,
      req,
    );
  }

  public async findById(id: string): Promise<IOrder> {
    return await this.getOneByIdOrThrow(id);
  }

  public async updateById(id: string, data: Partial<IOrder>): Promise<IOrder> {
    await this.getOneByIdOrThrow(id);

    return await Order.findOneAndUpdate(
      { _id: id },
      { ...data },
      { returnDocument: "after" },
    );
  }

  private async getOneByIdOrThrow(orderId: string): Promise<IOrder> {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new ApiError("Order not found", 422);
    }
    return order;
  }
}

export const orderService = new OrderService();
