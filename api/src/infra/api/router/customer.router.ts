import express, { Request, Response } from "express";
import CustomerFactory from "../../../domain/customer/customer.factory";

export const customerRouter = express.Router();

customerRouter.post("/", async (req: Request, res: Response) => {
  const customerFactory = CustomerFactory.create();
  try {
    const output = await customerFactory.createCustomer({
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      xCoordinate: req.body.x_coordinate,
      yCoordinate: req.body.y_coordinate,
    });
    res.send(output);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).send({
      message: err.message,
    });
  }
});

customerRouter.get("/:id", async (req: Request, res: Response) => {
  const customerFactory = CustomerFactory.create();
  try {
    const output = await customerFactory.findCustomerById({
      id: req.body.id
    })
    res.send(output);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).send({
      message: err.message,
    });
  }
});

customerRouter.get("/:email", async (req: Request, res: Response) => {
  const customerFactory = CustomerFactory.create();
  try {
    const output = await customerFactory.findCustomerByEmail({
      email: req.params.email
    })
    res.send(output);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).send({
      message: err.message,
    });
  }
});

customerRouter.get("/", async (req: Request, res: Response) => {
  const customerFactory = CustomerFactory.create();

  try {
    const output = await customerFactory.findAllCustomers();
    res.send(output);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).send({
      message: err.message,
    });
  }
});
