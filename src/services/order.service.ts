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
    query: IQuery,
  ): Promise<IPagination<IOrder>> {
    return await paginationService.addPaginationForList<IOrder>(
      query,
      EObjectType.Order,
    );
  }

  public async addOrder(data: IOrder) {
    return await Order.create(data);
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

  public async deleteById(id: string): Promise<void> {
    await Order.deleteOne({ _id: id });
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
