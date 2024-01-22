import { Customer } from "../domain/customer";
import { CustomerGateway } from "../domain/customer.gateway";

export class CreateCustomerUseCase {
  constructor(private CustomerGateway: CustomerGateway) {}

  async execute(
    email: string,
    name: string,
    phone: string,
    x_coordinate: number,
    y_coordinate: number
  ): Promise<Customer> {
    return await this.CustomerGateway.create(
      email,
      name,
      phone,
      x_coordinate,
      y_coordinate
    );
  }
}
