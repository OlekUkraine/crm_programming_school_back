import { ApiError } from "../errors";
import { Order } from "../models";
import { IOrder, IQuery } from "../types";

class OrderService {
  public async getAll(): Promise<IOrder[]> {
    return await Order.find();
  }

  public async findAllWithPagination(query: IQuery): Promise<IOrder[]> {
    try {
      const { page = 1, limit = 25, sortedBy, ...searchObject } = query;
      const skip = +limit * (+page - 1);

      const orders = await Order.find(searchObject)
        .sort(sortedBy ?? { _id: -1 })
        .limit(+limit)
        .skip(skip);

      if (!orders.length) {
        throw new ApiError("Not find any orders", 404);
      }

      return orders;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const orderService = new OrderService();
