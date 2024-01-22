import express, { Request, Response } from "express";
import CustomerFactory from "../../../domain/customer/customer.factory";
import Notification from "../../../@shared/notification";

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

    if (output instanceof Notification) {
      res.status(400).send(output);
    } else {
      res.send(output);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).send({
      message: err.message,
    });
  }
});

customerRouter.get("/id/:id", async (req: Request, res: Response) => {
  const customerFactory = CustomerFactory.create();
  try {
    const output = await customerFactory.findCustomerById({
      id: req.params.id,
    });

    if (output instanceof Notification) {
      res.status(400).send(output);
    } else {
      res.send(output);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).send({
      message: err.message,
    });
  }
});

customerRouter.get("/email/:email", async (req: Request, res: Response) => {
  const customerFactory = CustomerFactory.create();
  try {
    const output = await customerFactory.findCustomerByEmail({
      email: req.params.email,
    });

    if (output instanceof Notification) {
      res.status(400).send(output);
    } else {
      res.send(output);
    }
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

    if (output instanceof Notification) {
      res.status(400).send(output);
    } else {
      res.send(output);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).send({
      message: err.message,
    });
  }
});

customerRouter.get("/calculate-route", async (req: Request, res: Response) => {
  const customerFactory = CustomerFactory.create();

  try {
    const output = await customerFactory.calculateRoutes();

    if (output instanceof Notification) {
      res.status(400).send(output);
    } else {
      res.send(output);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).send({
      message: err.message,
    });
  }
});
