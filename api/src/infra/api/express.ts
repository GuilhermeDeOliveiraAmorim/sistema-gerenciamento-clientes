import express, { Express } from "express";
import cors from "cors";
import { customerRouter } from "./router/customer.router";

export const app: Express = express();

app.use(express.json());

app.use(cors());

app.use("/customer", customerRouter);
