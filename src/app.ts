/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { StudentRoutes } from "./app/modules/student/student.route";
import { UserRoutes } from "./app/modules/user.route";
import globalerrorhandler from "./app/middleware/globalerrorhandler";
import notFound from "./app/middleware/notfounds";
import router from "./app/routes";
const app: Application = express();
const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router);

const test = (_req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

console.log(process.cwd());

app.use(globalerrorhandler);

// not found
app.use(notFound);
export default app;
