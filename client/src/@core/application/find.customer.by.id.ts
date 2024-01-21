import { Customer } from "../domain/customer";
import { CustomerGateway } from "../domain/customer.gateway";

export class FindByIdCustomerUseCase {
  constructor(private CustomerGateway: CustomerGateway) {}

  async execute(id: string): Promise<Customer> {
    return await this.CustomerGateway.findById(id);
  }
}
