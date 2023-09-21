import { Router } from "express";

import { orderController } from "../controllers";
import { authMiddleware, commonMiddleware } from "../middlewares";

const router = Router();

router.get("/list", authMiddleware.checkAccessToken, orderController.getAll);

router.post("/add", authMiddleware.checkAccessToken, orderController.addOrder);

router.get(
  "/:orderId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("orderId"),
  orderController.findById,
);

router.put(
  "/update/:orderId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("orderId"),
  orderController.updateById,
);

router.delete(
  "/delete/:orderId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("orderId"),
  orderController.deleteById,
);

export const orderRouter = router;
