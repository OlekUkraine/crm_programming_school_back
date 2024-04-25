import { Router } from "express";

import { excelController, orderController } from "../controllers";
import { authMiddleware, commonMiddleware } from "../middlewares";
import { OrderValidator } from "../validators";

const router = Router();

router.get(
  "/",
  authMiddleware.checkAccessToken,
  commonMiddleware.isQueryValid(OrderValidator.getAll),
  orderController.getAll,
);

router.get(
  "/excel",
  authMiddleware.checkAccessToken,
  excelController.createExcelFile,
);

router.get(
  "/:orderId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("orderId"),
  orderController.findById,
);

router.patch(
  "/:orderId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("orderId"),
  commonMiddleware.isBodyValid(OrderValidator.update),
  orderController.updateById,
);

export const orderRouter = router;
