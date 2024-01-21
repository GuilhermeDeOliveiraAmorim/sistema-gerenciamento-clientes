import { Customer } from "../domain/customer";
import { CustomerGateway } from "../domain/customer.gateway";

export class CreateCustomerUseCase {
  constructor(private CustomerGateway: CustomerGateway) {}

  async execute(
    name: string,
    email: string,
    x_coordinate: number,
    y_coordinate: number
  ): Promise<Customer> {
    return await this.CustomerGateway.create(
      name,
      email,
      x_coordinate,
      y_coordinate
    );
  }
}
