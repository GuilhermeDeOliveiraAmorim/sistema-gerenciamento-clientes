import Customer from "./customer";

export default interface CustomerRepositoryInterface {
  create(customer: Customer): Promise<void>;
  findById(customerId: string): Promise<Customer | null>;
  findByEmail(customerEmail: string): Promise<Customer | null>;
  findAll(): Promise<Customer[]>;
}
