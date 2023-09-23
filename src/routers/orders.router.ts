import { Router } from "express";

import { orderController } from "../controllers";
import { authMiddleware, commonMiddleware } from "../middlewares";

const router = Router();

router.get("/list", authMiddleware.checkAccessToken, orderController.getAll);

router.post("/add", authMiddleware.checkAccessToken, orderController.addOrder);

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

router.delete(
  "/:orderId/delete",
  commonMiddleware.isIdValid("orderId"),
  authMiddleware.checkAccessToken,
  orderController.deleteById,
);

export const orderRouter = router;
