import Customer from "./customer";

export default interface CustomerRepositoryInterface {
    create(customer: Customer): Promise<void>;
    findById(customerId: string): Promise<Customer | null>;
    findAll(): Promise<Customer[]>;
    update(customerId: string, updatedCustomer: Customer): Promise<Customer | null>;
    activate(customerId: string): Promise<boolean>;
  }