import express from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs";
import { authRouter, orderRouter } from "./routers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/orders", orderRouter);
app.use("/auth", authRouter);

const startApp = async () => {
  try {
    await mongoose.connect(configs.DB_URL);
    app.listen(configs.PORT, async () => {
      // eslint-disable-next-line no-console
      console.log(`Server has started on PORT ${configs.PORT} 👌`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

startApp();
