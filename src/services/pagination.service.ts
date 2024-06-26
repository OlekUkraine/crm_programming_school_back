import { Request } from "express";
import { Model } from "mongoose";

import { EObjectType } from "../enums";
import { ApiError } from "../errors";
import { Comment, Group, Order, User } from "../models";
import { CustomSessionData, IPagination, IQuery } from "../types";

class PaginationService {
  public async addPaginationForList<T>(
    query: IQuery,
    objectType: EObjectType,
    req: Request & { session: CustomSessionData },
  ): Promise<IPagination<T>> {
    try {
      const { page = 1, limit = 25, sortedBy, ...searchObject } = query;
      const skip = +limit * (+page - 1);
      const objectOfSort = this.getSortObjectFromSession(req);

      const toggleSortDirection = (keyName: string): Record<string, number> => {
        return this.toggleSortDirection(objectOfSort, keyName, req);
      };

      let objectModel: Model<any>;

      switch (objectType) {
        case EObjectType.Order:
          objectModel = Order;
          break;
        case EObjectType.User:
          objectModel = User;
          break;
        case EObjectType.Comment:
          objectModel = Comment;
          break;
        case EObjectType.Group:
          objectModel = Group;
          break;
      }
      const [data, itemCount] = await Promise.all([
        objectModel
          .find({ ...searchObject })
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore

          .sort(sortedBy ? toggleSortDirection(sortedBy) : { _id: -1 })
          .limit(+limit)
          .skip(skip)
          .exec(),
        objectModel.countDocuments(),
      ]);

      return {
        page: +page,
        prePage: +limit,
        itemCount,
        itemFound: data.length,
        entities: data as T[],
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  private getSortObjectFromSession(
    req: Request & { session: CustomSessionData },
  ): Record<string, number> {
    return req.session.sort || {};
  }

  private toggleSortDirection(
    currentSortObject: Record<string, number>,
    keyName: string,
    req: Request & { session: CustomSessionData },
  ): Record<string, number> {
    const updatedSortObject = { ...currentSortObject };

    if (updatedSortObject[keyName] === -1) {
      updatedSortObject[keyName] = 1;
    } else {
      updatedSortObject[keyName] = -1;
    }

    req.session.sort = updatedSortObject;
    return { [keyName]: updatedSortObject[keyName] };
  }
}

export const paginationService = new PaginationService();
