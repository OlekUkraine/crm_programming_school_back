import express from "express";
import session from "express-session";
import * as mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import { configs } from "./configs";
import {
  authRouter,
  commentsRouter,
  groupsRouter,
  orderRouter,
  usersRouter,
} from "./routers";
import * as swaggerJson from "./utils/swagger.json";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: configs.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  }),
);

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/orders", orderRouter);
app.use("/groups", groupsRouter);
app.use("/comments", commentsRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

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
