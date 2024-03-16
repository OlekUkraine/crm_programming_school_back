import { Router } from "express";

import { excelController, orderController } from "../controllers";
import { authMiddleware, commonMiddleware } from "../middlewares";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, orderController.getAll);

router.get(
  "/excel",
  authMiddleware.checkAccessToken,
  excelController.createExcelFile,
);

router.get(
  "/:orderId",
  commonMiddleware.isIdValid("orderId"),
  authMiddleware.checkAccessToken,
  orderController.findById,
);

router.put(
  "/:orderId",
  commonMiddleware.isIdValid("orderId"),
  authMiddleware.checkAccessToken,
  orderController.updateById,
);

export const orderRouter = router;
