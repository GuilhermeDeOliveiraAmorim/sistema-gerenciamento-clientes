import { Customer } from "../domain/customer";
import { CustomerGateway } from "../domain/customer.gateway";

export class FindAllCustomersUseCase {
  constructor(private CustomerGateway: CustomerGateway) {}

  async execute(): Promise<Customer[]> {
    return await this.CustomerGateway.findAll();
  }
}
