import { NextFunction, Request, Response } from "express";

import { orderService } from "../services";
import { excelService } from "../services/excel.service";

class ExcelController {
  public async createExcelFile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const orders = await orderService.findAllWithPagination(
        // req.query as unknown as IQuery,
        req,
      );

      const buffer = await excelService.createExcelFile(orders.entities);

      res.setHeader("Content-Disposition", "attachment; filename=orders.xlsx");
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      );

      return res.send(buffer);
    } catch (e) {
      next(e);
    }
  }
}

export const excelController = new ExcelController();
