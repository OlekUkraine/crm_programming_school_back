import { Model } from "mongoose";

import { EObjectType } from "../enums";
import { ApiError } from "../errors";
import { Order, User } from "../models";
import { IPagination, IQuery } from "../types";

class PaginationService {
  public async addPaginationForList<T>(
    query: IQuery,
    objectType: EObjectType,
  ): Promise<IPagination<T>> {
    try {
      let objectModel: Model<any>;

      const { page = 1, limit = 25, sortedBy, ...searchObject } = query;
      const skip = +limit * (+page - 1);

      switch (objectType) {
        case EObjectType.User:
          objectModel = User;
          break;
        case EObjectType.Order:
          objectModel = Order;
          break;
        default:
          objectModel = User;
      }

      const [entities, ordersTotalCount, ordersSearchCount] = await Promise.all(
        [
          objectModel
            .find(searchObject)
            .sort(sortedBy ?? { _id: -1 })
            .limit(+limit)
            .skip(skip)
            .exec(),
          objectModel.count(),
          objectModel.countDocuments(searchObject),
        ],
      );

      return {
        page: +page,
        prePage: +limit,
        itemCount: ordersTotalCount,
        itemFound: ordersSearchCount,
        entities: entities as T[],
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const paginationService = new PaginationService();
