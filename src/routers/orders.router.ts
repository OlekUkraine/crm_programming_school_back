import { Router } from "express";

import { orderController } from "../controllers";
import { excelController } from "../controllers/excel.controller";
import { authMiddleware, commonMiddleware } from "../middlewares";

const router = Router();

router.get("/list", authMiddleware.checkAccessToken, orderController.getAll);

router.post("/add", authMiddleware.checkAccessToken, orderController.addOrder);

router.get(
  "/excel",
  // authMiddleware.checkAccessToken,
  excelController.createExcelFile,
);

router.get(
  "/:orderId",
  commonMiddleware.isIdValid("orderId"),
  authMiddleware.checkAccessToken,
  orderController.findById,
);

router.put(
  "/:orderId/update",
  commonMiddleware.isIdValid("orderId"),
  authMiddleware.checkAccessToken,
  orderController.updateById,
);

export const orderRouter = router;
