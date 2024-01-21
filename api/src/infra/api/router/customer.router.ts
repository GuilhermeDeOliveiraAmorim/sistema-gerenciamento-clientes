import express, { Request, Response } from "express";
import CustomerFactory from "../../../domain/customer/customer.factory";

export const customerRouter = express.Router();

customerRouter.get("/:id", async (req: Request, res: Response) => {
  const customerFactory = CustomerFactory.create();

  try {
    const input = {
      id: req.params.id,
    };
    const output = await customerFactory.findCustomerById(input);
    res.send(output);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).send({
      message: err.message,
    });
  }
});
