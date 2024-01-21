import dotenv from "dotenv";
import { app } from "./express";
import CustomerFactory from "../../domain/customer/customer.factory";

dotenv.config();

const port: number = Number(process.env.PORT) || 8001;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}`);
});

const fab = CustomerFactory.create();

fab.createCustomer({
	email: "guilherme@bol.com.br",
	name: "Guilherme Amorim",
	phone: "82999767761",
	xCoordinate: 2.6,
	yCoordinate: 5.6
});