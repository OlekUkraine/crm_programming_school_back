import { Request, Response } from "express";

import { ApiError } from "../errors";
import { excelService, orderService } from "../services";

class ExcelController {
  public async createExcelFile(
    req: Request,
    res: Response,
  ): Promise<Response<void>> {
    try {
      const orders = await orderService.findAllWithPagination(req);
      const buffer = await excelService.createExcelFile(orders.entities);

      res.setHeader("Content-Disposition", "attachment; filename=orders.xlsx");
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      );

      return res.send(buffer);
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

export const excelController = new ExcelController();
